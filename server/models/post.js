'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      isUrl: true
    },
    UserId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    animation: {
      type: DataTypes.STRING,
      defaultValue: 'cat'
    }
  }, {
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.User);
        Post.hasMany(models.Like);
      }
    }
  });
  return Post;
};
