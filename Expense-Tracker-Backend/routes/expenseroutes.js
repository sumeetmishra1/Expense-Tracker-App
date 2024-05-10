const express=require('express');
const router=express.Router();
const Authoriz=require('../Middleware/auth.js');
const expensecontroller=require('../Controllers/expense.controller.js'); 

router.post('/addexpense',Authoriz.authenticate,expensecontroller.addexpense);
router.get('/getexpense',Authoriz.authenticate,expensecontroller.getexpense);
router.get('/download',Authoriz.authenticate,expensecontroller.downloadexpense);
router.get('/get-downloads',Authoriz.authenticate,expensecontroller.getlistofdownloads);
router.delete('/delete/:id',Authoriz.authenticate,expensecontroller.deleteexpense);

module.exports=router;