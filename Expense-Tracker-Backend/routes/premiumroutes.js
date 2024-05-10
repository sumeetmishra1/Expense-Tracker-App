const express=require('express');
const router=express.Router();
const Authoriz=require('../Middleware/auth.js');
const premiumcontroller=require('../controllers/premium.controller.js');

router.get('/showleaderboard',Authoriz.authenticate,premiumcontroller.getleaderboard);

module.exports=router;