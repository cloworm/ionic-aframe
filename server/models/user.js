'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6, 20]
      }
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'http://lorempixel.com/50/50',
      isUrl: true
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true
    },
    animation: {
      type: DataTypes.STRING,
      defaultValue: 'cat'
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Post);
        User.hasMany(models.Like);
      }
    }
  });
  return User;
};
