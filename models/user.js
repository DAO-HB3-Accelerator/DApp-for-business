const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'username_unique', // Это уникальность, она создаст индекс автоматически
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
      name: 'email_unique', // То же самое для email
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
  // Убираем индекс уникальности, так как они уже добавлены в поля модели
  indexes: [],
});

module.exports = User;
