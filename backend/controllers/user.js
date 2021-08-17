const models= require('../models');
const usersModel=models.user;
const bcrypt= require('bcrypt');

exports.signup=(req,res, next)=>{
  bcrypt.hash(req.body.motDePasse, 10)
  .then(hash=>{
    const userInfos={
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      motDePasse: hash
    }
    usersModel.create(userInfos)
    .then(result=>{res.status(201).json({
      message: 'User enregistré!',
      user: result
    })})
    .catch(error=>{res.status(500).json({message: error})});
  })
  .catch(error=>{res.status(500).json({messagefromHashCatch: error})})
  
}