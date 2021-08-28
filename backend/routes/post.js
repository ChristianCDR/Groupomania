const express= require('express');
const route= express.Router();
const ctrlPost= require('../controllers/post.js');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

route.post('/',auth, multer, ctrlPost.createNewPost);
route.get('/',auth, ctrlPost.getAllPosts);
route.put('/:id',auth, multer, ctrlPost.modifyPost);
route.delete('/:id',auth, ctrlPost.deletePost);

module.exports= route;