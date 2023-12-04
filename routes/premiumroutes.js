const express=require('express');
const router=express.Router();
const premiumcontroller=require('../controllers/premiumcontroller');
router.get('/showleaderboard',premiumcontroller.getleaderboard);
module.exports=router;