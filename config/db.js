const { Sequelize } = require('sequelize');

// Подключение к базе данных PostgreSQL в Docker
const sequelize = new Sequelize('HB3A', 'Alex', 'avtb140985', {
    host: 'dapp-for-business_db_1',
    dialect: 'postgres',
    port: 5432,
});

module.exports = sequelize;
