const posts= require ('../models/');
const postModel= posts.post;
const fs=require('fs');
//Création d'un nouveau post
exports.createNewPost=(req, res)=>{
  //Si le post contient une image, on lui crée une url
  const newPost= req.file ? {
    ...req.body,   
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }:{ ...req.body }
  postModel.create(newPost)
  .then(result=>{res.status(201).json({
    message: 'Post enregistré!',
    post: result
  })
})
  .catch(error=>{res.status(500).json({ErrorOnPostCreation: error})});
}
//Récuperer tous les posts pour les afficher
exports.getAllPosts=(req, res)=>{
  postModel.findAll()
  .then(result=>{res.status(200).json({
    message: 'Posts got!',
    posts: result
  })})
  .catch(error=>{res.status(500).json({ErrorOnGetAll: error})});
}
//Modifier un post
exports.modifyPost=(req, res) => {
  const postObject= req.file ? {
    ...req.body,
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }:{...req.body};
  //S'il y a une image, on la prend en charge ici
  postModel.findByPk(req.params.id)
  .then((thePost)=>{
    if(thePost.imageUrl){
      const filename= thePost.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`,()=>{
          postModel.update(postObject, {where:{ id: req.params.id }})
          .then(() => res.status(200).json({ 
            message: 'Post modifié!',
            post: postObject
          }))
          .catch(error => res.status(500).json({ErrorOnUpdate: error }));
        })
    }
    //Sinon c'est dans le else
    else{
      postModel.update(postObject, {where:{ id: req.params.id }})
      .then(() => res.status(200).json({ 
        message: 'Post modifié!',
        post: postObject
      }))
      .catch(error => res.status(500).json({ErrorOnUpdate: error }));
    }
  })
  .catch(error => res.status(500).json({ error }));
};
//Supprimer un post
exports.deletePost=(req, res) => {
  //Chercher le post par son id
  postModel.findByPk(req.params.id)
  .then((thePost)=>{ 
    //Si le post ne contient pas d'image, on entre dans le if
    if(thePost.imageUrl==null){
      //On supprime le post
      postModel.destroy({where:{id: req.params.id}})
      .then(() => res.status(200).json({ 
        message: 'Post supprimé!'
      }))
      .catch(error => res.status(500).json({ErrorOnDelete: error }));
    }
    //S'il y a ue image, on supprime l'image de la db
    else{
      const filename= thePost.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`,()=>{
        postModel.destroy({where:{id: req.params.id}})
        .then(() => res.status(200).json({ 
          message: 'Post supprimé!',
        }))
        .catch(error => res.status(500).json({ErrorOnDelete: error }));
      })
    } 
  })
  .catch(error => res.status(500).json({ error }));  
}