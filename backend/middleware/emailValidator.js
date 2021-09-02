//On fait passer le mail au validateur
/*Le mail peut contenir:
-1 ou plusieurs lettres de A à Z miniscules, 
-1 ou plusieurs chiffres,
-des points, tirets, underscores,
- 1 @,
-1 point
 */
exports.emailValidator = (req, res, next) => {
  try{
    const validEmail = (email) => {

      let emailRegExp = new RegExp('^[a-z0-9.-_]+[@]{1}[groupomania]+[.]{1}[a-z]{2,10}$', 'g');
      let emailTest = emailRegExp.test(email); 

      if(!emailTest){
       // res.status(400).json({ message: 'Adresse mail invalide !' });
       throw 'Mail invalide';
      }
      else{
        next();
      }
    }

    validEmail(req.body.email)
  }
  catch(error){
    res.status(401).json({ errorFromEmailValidator: error });
  }
};