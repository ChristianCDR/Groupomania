const express= require('express');
const route= express.Router();
const ctrlPost= require('../controllers/post.js');
const ctrlCom = require('../controllers/commentaires')
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

route.post('/',auth, multer, ctrlPost.createNewPost);
route.post('/:id',auth, ctrlCom.commentPost);
route.get('/',auth, ctrlPost.getAllPosts);
route.get('/:id',auth, ctrlCom.getComments);
route.put('/:id',auth, multer, ctrlPost.modifyPost);
route.delete('/:id',auth, ctrlPost.deletePost);

module.exports= route;