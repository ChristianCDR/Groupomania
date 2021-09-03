const models= require ('../models/');
const commentsModel = models.commentaires;

//Enregistrement d'un nouveau commentaire
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

//Récuperation d'un commentaire
exports.getComments=(req, res)=>{
  commentsModel.findAll({where:{postId: req.params.id}})
  .then(result=>{res.status(200).json({
    message: 'Comments got!',
    comments: result
  })})
  .catch(error=>{res.status(500).json({ErrorOnGetAllComments: error})});
}
//Modification d'un commentaire
exports.modifyComment=(req, res) => {
  const commentObject = { ...req.body };
  commentsModel.findByPk(req.params.id)
  .then(()=>{
    commentsModel.update(
      {commentaire: commentObject.commentaire }, 
      {where:{ id: req.params.id }}
      )
      .then(() => res.status(200).json({ 
        message: 'Commentaire modifié!',
        post: commentObject
      }))
      .catch(error => res.status(500).json({ErrorOnCommentUpdate: error }));
  })
  .catch(error => res.status(500).json({ error }));
}
//Suppression d'un commentaire
exports.deleteComment=(req, res) => {
  commentsModel.findByPk(req.params.id)
  .then(()=>{
    commentsModel.destroy({where:{id: req.params.id}})
      .then(() => res.status(200).json({ 
        message: 'Commentaire supprimé!'
      }))
      .catch(error => res.status(500).json({ErrorOnDeleteComment: error }));
  })
  .catch(error => res.status(500).json({ error }));
}