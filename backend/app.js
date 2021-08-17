const express= require('express');
const cors = require('cors');
const helmet= require('helmet');
//const routebidule = require('./routes/bidule');
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

//app.use('/images', express.static(path.join(__dirname, 'images')));
//app.use('/?#/bidule', routebidule);
app.use('/auth',routeUser);

/*app.use('/auth/signup', (req, res, next) => {
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 5000,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff);
});*/

module.exports=app;  