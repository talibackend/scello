const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const sequelize = require("./database/sequelize");

//Import Models
const Cart = require("./database/models/Cart");
const Item = require("./database/models/Item");
const Coupon = require("./database/models/Coupon");

sequelize.sync({force : true}).then((result)=>{
    console.log("Database connection successful!");

}).catch(err=>console.log(`Failed to connect to database. \n Because : ${err}`))

app.listen(port, ()=>{console.log(`Server running on port ${port}`)});