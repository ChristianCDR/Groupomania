const express= require('express');
const cors = require('cors');
const helmet= require('helmet');
const routePost = require('./routes/post');
const routeUser= require('./routes/user');
const path= require ('path');
const mysql=require('mysql2');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '' 
});
 
connection.connect(function(err) {
  if (err) { 
    console.error('Connexion échouee!' + err.stack); 
    return;
  }
 
  console.log('Connexion au serveur réussie avec id:' + connection.threadId);
});

const app= express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/post', routePost);
app.use('/auth', routeUser);

module.exports=app;  