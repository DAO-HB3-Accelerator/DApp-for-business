require('dotenv').config();

const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: process.env.DB_DIALECT_DEV,
  },
  test: {
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: process.env.DB_DIALECT_TEST,
  },
  production: {
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: process.env.DB_DIALECT_PROD,
  },
};

const currentConfig = config[env];

const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  }
);

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error connecting to the database:', err));

module.exports = sequelize;

