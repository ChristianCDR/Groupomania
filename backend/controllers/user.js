const models= require('../models');
const usersModel=models.user;

exports.saveInDB=(req,res, next)=>{
  const userInfos={
    ...req.body 
  }
  usersModel.create(userInfos)
  .then(result=>{res.status(201).json({
    message: 'User enregistré!',
    user: result
  })})
  .catch(error=>{res.status(500).json({message: error})});
}