const express= require('express');
const route= express.Router();
const ctrlPost= require('../controllers/post.js');
const multer = require('../middleware/multer-config');


route.post('/', multer,ctrlPost.createNewPost);
route.get('/', ctrlPost.getAllPosts);
route.put('/:id',multer, ctrlPost.modifyPost);
route.delete('/:id', ctrlPost.deletePost);

module.exports= route;