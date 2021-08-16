const userModel= require('../models/usermodel');
exports.saveInDB=(req,res, next)=>{
  const userInfos={
    nom: req.body.nom,
    prenom:req.body.prenom,
    email: req.body.email,
    anniversaire: req.body.anniversaire,
    motDePasse: req.body.motDePasse
  }
  userModel.create(userInfos)
  .then(result=>{res.status(201).json({
    message: 'User enregistré!',
    user: result
  })})
  .catch(error=>{res.status(500).json({message: error})});
}