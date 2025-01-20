const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'username_unique',
      msg: 'Username must be unique.',
    },
    validate: {
      notEmpty: {
        msg: 'Username cannot be empty.',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'email_unique',
      msg: 'Email must be unique.',
    },
    validate: {
      isEmail: {
        msg: 'Must be a valid email address.',
      },
      notEmpty: {
        msg: 'Email cannot be empty.',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 50],
        msg: 'Password must be between 8 and 50 characters.',
      },
      notEmpty: {
        msg: 'Password cannot be empty.',
      },
    },
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['username'],
    },
    {
      unique: true,
      fields: ['email'],
    },
  ],
});

module.exports = User;
