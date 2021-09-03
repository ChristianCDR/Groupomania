const jwt= require('jsonwebtoken');
require('dotenv').config();

module.exports=(req,res,next)=>{
  //Récupérer et décoder et décoder le token pour comparer le userId fourni avec celui de la db
    try{
      const token= req.headers.authorization.split(' ')[1];
      const decodedToken= jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      const userId= decodedToken.userId;
  //Si le userId n'est pas dans la db, on en renvoie une erreur
      if(req.body.userId && req.body.userId !== userId){
        throw 'Identifiant utilisateur non valable';
      }
      else{
        next();
      }
    }
    catch(error){
      res.status(401).json({errorFromAuthJS: error | 'requête non authentifiée'});
    }
  }