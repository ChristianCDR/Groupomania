const posts= require ('../models/');
const postModel= posts.post;

exports.createNewPost=(req, res, next)=>{
  const newPost= {
    ...req.body,
    //imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  };   
  postModel.create(newPost)
  .then(result=>{res.status(201).json({
    message: 'Post enregistré!',
    post: result
  })})
  .catch(error=>{res.status(500).json({ErrorOnPostCreation: error})});
}

exports.getAllPosts=(req, res, next)=>{
  postModel.findAll()
  .then(result=>{res.status(200).json({
    message: 'Posts got!',
    posts: result
  })})
  .catch(error=>{res.status(500).json({ErrorOnGetAll: error})});
}
exports.getOnePost=(req, res, next) =>{

}
exports.modifyPost=(req, res, next) => {
  const postObject= req.file ? {
    ...JSON.parse(req.body.post),
   // imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }:{...req.body};

  postModel.update(postObject, {where:{ id: req.params.id }})
  .then((result) => res.status(200).json({ 
    message: 'Post modifié!',
    post: result
  }))
  .catch(error => res.status(400).json({ error }));
};