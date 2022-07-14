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
        allowNull : false,
        defaultValue : 1
    },
    perc_value : {
        type : DataTypes.FLOAT,
        defaultValue : 0
    },
    fixed_value : {
        type : DataTypes.FLOAT,
        defaultValue : 0
    },
    use_max : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    use_min : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    }
}, {sequelize})

module.exports = Coupon;