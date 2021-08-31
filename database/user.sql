CREATE USER 'admin'@'localhost' IDENTIFIED BY 'process.env.mdpadmin';
ALTER USER 'admin'@'localhost' IDENTIFIED BY 'mdpAdmin';

GRANT ALL PRIVILEGES ON gmdb.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;