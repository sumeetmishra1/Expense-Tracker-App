const express=require('express');
const usercontroller=require('../Controllers/user.controller.js');
const router=express.Router();

router.post('/signup',usercontroller.addNewUser);
router.post('/login',usercontroller.loginUser);

module.exports=router;
