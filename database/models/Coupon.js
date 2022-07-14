const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Coupon extends Model {}

Coupon.init({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    code : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    min_price : {
        type : DataTypes.FLOAT,
        allowNull : false
    },
    min_items : {
        type : DataTypes.FLOAT,
        allowNull : false
    },
    perc_value : {
        type : DataTypes.FLOAT,
        defaultValue : 0
    },
    fixed_value : {
        type : DataTypes.FLOAT,
        defaultValue : 0
    }
}, {sequelize})

module.exports = Coupon;