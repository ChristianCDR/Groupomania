const models= require('../models');
const usersModel=models.user;
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
require('dotenv').config();

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

 exports.login=(req,res, next)=>{
  usersModel.findOne({where:{email: req.body.email}})
   .then(theUser=>{
     if(!theUser){
       return res.status(401).json({message: 'Utilisateur inconnu!'});
     }
     bcrypt.compare(req.body.motDePasse, theUser.motDePasse)
     .then(validPassword=>{
       if(!validPassword){
         return res.status(401).json({message: 'Mot de passe incorrect!'});
       }
       res.status(200).json({
         userId: theUser.id,
         token: jwt.sign(
           {userId: theUser.id},
           process.env.TOKEN_SECRET_KEY,
           {expiresIn:'24h'}
           )
       });
     })
     .catch(error=>{res.status(500).json({error})});
   })
   .catch(error=>{res.status(500).json({msgFromFindOneCatch: error })}); 
 };