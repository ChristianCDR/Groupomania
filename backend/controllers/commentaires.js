const models= require ('../models/');
const commentsModel = models.commentaires;

exports.commentPost=(req, res)=>{
  const newComment= { ...req.body }
  commentsModel.create(newComment)
  .then(result=>{res.status(201).json({
    message: 'Commentaire enregistré!',
    post: result
  })
})
  .catch(error=>{res.status(500).json({ErrorOnCommentCreation: error})});
}
exports.getComments=(req, res)=>{
  commentsModel.findAll({where:{postId: req.params.id}})
  .then(result=>{res.status(200).json({
    message: 'Comments got!',
    comments: result
  })})
  .catch(error=>{res.status(500).json({ErrorOnGetAll: error})});
}