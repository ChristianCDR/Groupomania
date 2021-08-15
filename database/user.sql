  CREATE DATABASE GM_DATABASE

  CREATE TABLE `users`( 
    `id_user` SMALLINT(70) NOT NULL AUTO_INCREMENT,
    `user_nom`  VARCHAR(70) NOT NULL,
    `user_prenom` VARCHAR(70) NOT NULL,
    `user_email` VARCHAR(70) NOT NULL,
    `user_anniversaire` DATE NOT NULL,
    `user_motDePasse` VARCHAR(70) NOT NULL,

      PRIMARY KEY(id_user),
      UNIQUE(user_email)
  );

  INSERT INTO `users`(user_nom,user_prenom,user_email,user_anniversaire,user_motDePasse)
  VALUES()