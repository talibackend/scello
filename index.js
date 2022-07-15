const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const sequelize = require("./database/sequelize");

//Import Models
const Cart = require("./database/models/Cart");
const Item = require("./database/models/Item");
const Coupon = require("./database/models/Coupon");

Cart.hasMany(Item);
Item.belongsTo(Cart);

//Seed Data
const cart = require('./database/seeds/cart');
const coupons = require('./database/seeds/coupon');


app.use(express.json());

sequelize.sync({ force: true }).then(() => {
    console.log("Database connection successful!");
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price
    }
    Cart.create({ total_price: totalPrice }).then((cartResponse) => {
        for (let i = 0; i < cart.length; i++) {
            cart[i].cart_id = cartResponse.id;
        }
        Item.bulkCreate(cart).then(() => {
            Coupon.bulkCreate(coupons).then(()=>{
                console.log("Required data seeded successfully!");
            }).catch(err=>console.log(`Failed to see coupons. Because : ${err}`))

        }).catch(err => console.log(`Failed to seed cart items. Because : ${err}`))
        
    }).catch(err => console.log(`Failed to seed cart data. Because : ${err}`))

}).catch(err => console.log(`Failed to connect to database. \n Because : ${err}`));

app.get("/", (req, res)=>{
    return res.send("<h1>This is my scello test solution!</h1>");
});

app.get('/cart', async (req, res)=>{
    try{
        const onlyCart = await Cart.findOne();
        //For some reason I havebn't figured out, the total is not returning a neat value.
        //So I decided to clean it up
        onlyCart.total_price = parseFloat(onlyCart.total_price.toFixed(2));
        let responseCart = {...onlyCart.dataValues};
        let items = await Item.findAll({where : {cart_id : onlyCart.id}});
        responseCart.items = items;
        return res.status(200).json({status : true, message : "Cart fetched", data : responseCart});
    }catch(err){
        console.log(`Failed to fetch cart. Because : ${err}`);
        return res.status(500).json({status : false, message : "Failed to fetch cart due to server error, please try again"});
    }
});

app.post('/coupon', async (req, res)=>{
    const {cart_id, coupon_code} = req.body;
    if(!cart_id || !coupon_code){
        return res.status(400).json({status : false, message : "Bad request body."});
    }else{
        const cart = await Cart.findOne({where : {id : cart_id}});
        const coupon = await Coupon.findOne({where : {code : coupon_code}});
        const itemCount = await Item.count({where : {cart_id}});
        if(!cart || !coupon){
            return res.status(400).json({status : false, message : "Bad request body"});
        }else{
            if(cart.coupon != null){
                return res.status(401).json({status : false, message : "Coupon already applied to cart."});
            }else{
                if(cart.total_price < coupon.min_price){
                    return res.status(401).json({status : false, message : `Please add items that worth at least $${parseFloat(coupon.min_price - cart.total_price).toFixed(2)} to use this coupon.`});
                }else{
                    if(itemCount < coupon.min_item){
                        return res.status(401).json({status : false, message : `Please add ${coupon.min_item - itemCount} more items to cart in order to use this coupon`});
                    }else{
                        let discount = 0;
                        let percDiscount = ((coupon.perc_value / 100) * cart.total_price);
                        let fixedDiscount = coupon.fixed_value;
                        if(coupon.use_max){
                            discount += percDiscount > fixedDiscount ? percDiscount : fixedDiscount;
                        }else{
                            discount += fixedDiscount;
                            discount += percDiscount;
                        }
                        cart.total_price = parseFloat(cart.total_price - discount).toFixed(2);
                        cart.coupon = coupon_code;
                        await cart.save();
                        return res.status(200).json({status : true, message : 'Coupon applied successfully.', data : cart});
                    }
                }
            }
        }
    }
});

app.listen(port, () => { console.log(`Server running on port ${port}`) });












