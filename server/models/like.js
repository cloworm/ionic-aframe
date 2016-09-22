'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Like.belongsTo(models.User);
        Like.belongsTo(models.Post);
      }
    }
  });
  return Like;
};
