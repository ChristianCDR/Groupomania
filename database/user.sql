CREATE USER 'admin'@'localhost' IDENTIFIED BY '';
ALTER USER 'admin'@'localhost' IDENTIFIED BY '';

GRANT ALL PRIVILEGES ON gmdb.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;