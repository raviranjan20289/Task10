const Sequelize = require("sequelize");

const sequelize = new Sequelize('connect-node', 'root', 'connectnode', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;