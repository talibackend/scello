const { Model, DataTypes } = require("sequelize");
const sequelize = require('../sequelize');

class Cart extends Model{}

Cart.init({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    total_price : {
        type : DataTypes.FLOAT,
        allowNull : false
    },
    coupon : {
        type : DataTypes.STRING,
        allowNull : true
    }
}, {sequelize});

module.exports = Cart;