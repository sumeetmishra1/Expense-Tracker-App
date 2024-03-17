const express=require('express');
const router=express.Router();
const Authoriz=require('../middleware/auth');
const premiumcontroller=require('../controllers/premiumcontroller');
router.get('/showleaderboard',Authoriz.authenticate,premiumcontroller.getleaderboard);
module.exports=router;