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
exports.modifyComment=(req, res) => {
  const commentObject = { ...req.body.commentaire };
  commentsModel.findByPk(req.params.id)
  .then(()=>{
    commentsModel.update(commentObject, {where:{ id: req.params.id }})
      .then(() => res.status(200).json({ 
        message: 'Commentaire modifié!',
        post: commentObject
      }))
      .catch(error => res.status(500).json({ErrorOnCommentUpdate: error }));

  })
  .catch(error => res.status(500).json({ error }));
}