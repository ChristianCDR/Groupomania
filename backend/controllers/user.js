const models= require('../models');
const usersModel=models.user;
const posts= require ('../models/');
const postModel= posts.post;
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
require('dotenv').config();
const fs=require('fs');

exports.signup=(req,res, next)=>{
  bcrypt.hash(req.body.motDePasse, 10)
  .then(hash=>{
    const userInfos={
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
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

exports.deleteUser=(req,res, next)=>{
  usersModel.findByPk(req.params.id)
  .then(()=>{
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
      const filename= userPosts.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`,()=>{
        postModel.destroy({where:{userId: req.params.id}})
        .then(() => res.status(200).json({ 
          message: 'User supprimé!',
        }))
        .catch(error => res.status(500).json({ErrorOnDelete: error }));
      })
    } 
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
