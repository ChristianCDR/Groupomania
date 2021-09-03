/*Créer le user s'il n'existe pas*/
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY '';

/*Allouer les privilèges*/
GRANT ALL PRIVILEGES ON gmdb.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;

/*Modifier le mot de passe*/
ALTER USER 'admin'@'localhost' IDENTIFIED BY '';

/*On update la table users*/
UPDATE users

/*Passer 'admin@groupomania.fr' administrateur*/
SET isAdmin= 'true';
WHERE email = cryptojs.SHA512('admin@groupomania.fr').toString(cryptojs.enc.Base64);;