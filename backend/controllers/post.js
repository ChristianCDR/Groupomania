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
    user: result
  })})
  .catch(error=>{res.status(500).json({ErrorOnPostCreation: error})});
}
exports.getAllPosts=(req, res, next)=>{
  postModel.findAll()
  .then(result=>{res.status(200).json({
    message: 'Posts got!',
    user: result
  })})
  .catch(error=>{res.status(500).json({ErrorOnGetAll: error})});
}