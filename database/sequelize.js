const { Sequelize } = require('sequelize');

module.exports = new Sequelize('', '', '', {
    dialect : 'sqlite',
    host : 'db.sqlite'
});