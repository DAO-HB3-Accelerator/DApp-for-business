const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://Alex:avtb140985@db:5432/HB3A', {
    dialect: 'postgres',
});

module.exports = sequelize;

