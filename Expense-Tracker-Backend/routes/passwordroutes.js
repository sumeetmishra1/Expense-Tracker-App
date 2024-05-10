const express=require('express');
const router=express.Router();
const passwordcontroller=require('../Controllers/forgotPassword.controllers.js')

router.post('/forgotpassword',passwordcontroller.forgotpassword);
router.get('/verifyLink/:uniqueId',passwordcontroller.verifyPasswordLink);
router.post('/setnewpassword',passwordcontroller.setnewpassword);

module.exports=router;