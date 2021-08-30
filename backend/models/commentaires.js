'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentaires extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      commentaires.belongsTo(  
        models.user,
        {
          foreignKey:{
          allowNull:false
          }
        }
      );
      commentaires.belongsTo(
        models.post,
        {
          foreignKey:{
          allowNull:false
          }
        }
      )

    }
  };
  commentaires.init({
    commentaire: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'commentaires',
  });
  return commentaires;
};