'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
      userModel.hasMany(models.post);
      userModel.hasMany(models.commentaires);
    }
  };
  userModel.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    motDePasse: DataTypes.STRING,
    isAdmin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return userModel;
};