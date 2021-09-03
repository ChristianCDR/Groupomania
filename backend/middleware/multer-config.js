const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

//Configuration du stockage du fichier
const storage= multer.diskStorage({
  //On désigne une destination pour les fichiers
  destination:(req,file,callback)=>{
    callback(null,'images');
  },
  //On crée un nom unique pour le fichier
  filename:(req,file,callback)=>{
    const name= file.originalname.split(' ').join('_').split('.')[0];
    const extension= MIME_TYPES[file.mimetype];
    callback(null, name+ Date.now()+ '.'+ extension);
  }
});

module.exports= multer({storage}).single('inputFile');