const express= require('express');
const route= express.Router();
const ctrlUser= require('../controllers/user.js');
const ctrlPass= require('../middleware/passwordValidator');
const ctrlEmail= require('../middleware/emailValidator');

 route.post('/signup', ctrlEmail.emailValidator, ctrlPass.passwordValidator, ctrlUser.signup);
 route.post('/login', ctrlUser.login); 
 route.delete('/:id', ctrlUser.deleteUser);

 module.exports= route; 