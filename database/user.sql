
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY '';

GRANT ALL PRIVILEGES ON gmdb.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;

ALTER USER 'admin'@'localhost' IDENTIFIED BY '';

UPDATE users
SET isAdmin= 'true';
WHERE email = cryptojs.SHA512('admin@groupomania.fr').toString(cryptojs.enc.Base64);;