const posts= require ('../models/');
const postModel= posts.post;
const fs=require('fs');

exports.createNewPost=(req, res)=>{
  const newPost= req.file ? {
    ...req.body,
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }:{ ...req.body }
  postModel.create(newPost)
  .then(result=>{res.status(201).json({
    message: 'Post enregistré!',
    post: result
  })})
  .catch(error=>{res.status(500).json({ErrorOnPostCreation: error})});
}

exports.getAllPosts=(req, res)=>{
  postModel.findAll()
  .then(result=>{res.status(200).json({
    message: 'Posts got!',
    posts: result
  })})
  .catch(error=>{res.status(500).json({ErrorOnGetAll: error})});
}
exports.modifyPost=(req, res) => {
  const postObject= req.file ? {
    ...JSON.parse(req.body.post),
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }:{...req.body};

  postModel.update(postObject, {where:{ id: req.params.id }})
  .then(() => res.status(200).json({ 
    message: 'Post modifié!',
    post: postObject
  }))
  .catch(error => res.status(500).json({ErrorOnUpdate: error }));
};

exports.deletePost=(req, res) => {
  postModel.findByPk(req.params.id)
  .then(()=>{
    postModel.destroy({where:{id: req.params.id}})
  .then(() => res.status(200).json({ 
    message: 'Post supprimé!',
  }))
  .catch(error => res.status(500).json({ErrorOnDelete: error }));
  })
  .catch();
  
}