'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // define association here
    }
  };
  users.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    anniversaire: DataTypes.DATE,
    motDePasse: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};