//On fait passer le mail au validateur
/*Le mail peut contenir:
-1 ou plusieurs lettres de A à Z miniscules, 
-1 ou plusieurs chiffres,
-des points, tirets, underscores,
- 1 @,
-'groupomania',
-1 point,
-une extension de 2 à 10 lettres
 */
exports.emailValidator = (req, res, next) => {
  try{
    const validEmail = (email) => {

      let emailRegExp = new RegExp('^[a-z0-9.-_]+[@]{1}[groupomania]+[.]{1}[a-z]{2,10}$', 'g');
      let emailTest = emailRegExp.test(email); 
  //Si le mail ne satisfait pas, on renvoie une erreur
      if(!emailTest){
       throw 'Mail invalide';
      }
      else{
        next();
      }
    }

    validEmail(req.body.email)
  }
  catch(error){
    res.status(400).json({ message: error });
  }
};