const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Item extends Model {}

Item.init({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    price : {
        type : DataTypes.FLOAT,
        allowNull : false
    },
    cart_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
}, {sequelize})

module.exports = Item;