  CREATE DATABASE GM_DATABASE

  CREATE TABLE `users`( 
    `id_user` SMALLINT(70),
    `user_nom`  VARCHAR(70),
    `user_prenom` VARCHAR(70),
    `user_email` VARCHAR(70),
    `user_anniversaire` DATE,
    `user_motDePasse` VARCHAR(70)
  );