const express= require('express');
const route= express.Router();
const ctrlPost= require('../controllers/post.js');

route.post('/', ctrlPost.createNewPost);
route.get('/', ctrlPost.getAllPosts);
route.put('/:id', ctrlPost.modifyPost);
//route.delete('/:id', ctrlPost);

module.exports= route;