'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersModel extends Model {
    static associate(models) {
      // define association here
      usersModel.hasMany(models.post,{
        onDelete:"cascade"
      });
    }
  };
  usersModel.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    motDePasse: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user'
  });
  return usersModel;
};