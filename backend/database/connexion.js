const Sequelize= require('sequelize');

const sequelize = new Sequelize('gmDB', 'root', `process.env.DBmdp`,{
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false 
});

module.exports=sequelize;