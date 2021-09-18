const models= require('../models');
const usersModel=models.user;
const posts= require ('../models/');
const postModel= posts.post;
const bcrypt= require('bcrypt');
const cryptojs = require("crypto-js");
const jwt= require('jsonwebtoken');
require('dotenv').config(); 
const fs=require('fs');

//Enregistrement du nouvel utilisateur
exports.signup=(req,res, next)=>{
  //On hash le mail avec Crypto JS
  const hashedEmail = cryptojs.HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_KEY).toString(cryptojs.enc.Base64);
  //On hash le mot de passe
  bcrypt.hash(req.body.motDePasse, 10)
  .then(hash=>{
    const userInfos={
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: hashedEmail,
      isAdmin: req.body.isAdmin,
      motDePasse: hash
    }
    //Création du compte
    usersModel.create(userInfos)
    .then(result=>{res.status(201).json({
      message: 'User enregistré!',
      user: result
    })})
    .catch(error=>{res.status(500).json({message: error})});
  })
  .catch(error=>{res.status(500).json({messagefromHashCatch: error})}) 
}

//Route de connexion du user
exports.login=(req,res, next)=>{
  //On recherche le mail du user
  const hashedEmail = cryptojs.HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_KEY).toString(cryptojs.enc.Base64);
  usersModel.findOne({where:{email: hashedEmail}})
   .then(theUser=>{
     if(!theUser){
       return res.status(401).json({message: 'Utilisateur inconnu!'});
     }
     //Si on le trouve, on compare le mot de passe
     bcrypt.compare(req.body.motDePasse, theUser.motDePasse)
     .then(validPassword=>{
       if(!validPassword){
         return res.status(401).json({message: 'Mot de passe incorrect!'});
       }
       //Si tout est bon, on le connecte
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
//Supprimer le compte d'un user
exports.deleteUser=(req,res, next)=>{
  //Chercher le user par son id
  usersModel.findByPk(req.params.id)
  .then(()=>{
    //On cherche tous ses posts pour les supprimer
   postModel.findAll({where:{userId: req.params.id}})
  .then((userPosts)=>{
    if(userPosts.imageUrl==null){
      postModel.destroy({where:{userId: req.params.id}})
      .then(() => res.status(200).json({ 
        message: 'User supprimé!'
      }))
      .catch(error => res.status(500).json({ErrorOnDelete: error }));
    }
    else{
      //On supprime les fichiers publiés par le user
      const filename= userPosts.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`,()=>{
        postModel.destroy({where:{userId: req.params.id}})
        .then(() => res.status(200).json({ 
          message: 'User supprimé!',
        }))
        .catch(error => res.status(500).json({ErrorOnDelete: error }));
      })
    } 
    //On supprime le compte
    usersModel.destroy({where:{id: req.params.id}})
    .then(() => res.status(200).json({ 
      message: 'User supprimé!'
    }))
    .catch(error => {res.status(500).json({ msgFromDestroyUserCatch: error })});

  })
  .catch(error => res.status(500).json({ error }));
  })
  .catch(error => {res.status(500).json({ msgFromDeleteUserCatch: error })});  
}
