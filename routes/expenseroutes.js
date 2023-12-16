const express=require('express');
const router=express.Router();
const Authoriz=require('../middleware/auth');
const expensecontroller=require('../controllers/expensecontroller');
router.post('/addexpense',Authoriz.authenticate,expensecontroller.addexpense);
router.get('/getexpense',Authoriz.authenticate,expensecontroller.getexpense);
router.get('/download',Authoriz.authenticate,expensecontroller.downloadexpense);
router.get('/get-downloads',Authoriz.authenticate,expensecontroller.getlistofdownloads);
router.delete('/delete/:id',Authoriz.authenticate,expensecontroller.deleteexpense);

module.exports=router;