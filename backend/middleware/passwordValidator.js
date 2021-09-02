const passwordSchema = require('../utils/passwordValidator');
//On fait passer le mot de passe fourni au validateur
exports.passwordValidator = (req, res, next) => {
    if (!passwordSchema.validate(req.body.motDePasse)) {
        res.status(400).json({ message: "Erreur: Le mot de passe doit contenir au moins: 5 caractères, 1 miniscule, 1 majuscule, 2 chiffres, pas d'espace, pas de caractères spéciaux" });
    } else {
        next();
    }
};