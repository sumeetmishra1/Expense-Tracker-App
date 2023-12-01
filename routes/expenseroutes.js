const express=require('express');
const router=express.Router();
const Authoriz=require('../middleware/auth');
const expensecontroller=require('../controllers/expensecontroller');
router.post('/addexpense',expensecontroller.addexpense);
router.get('/getexpense',Authoriz.authenticate,expensecontroller.getexpense);
router.post('/delete/:id',expensecontroller.deleteexpense);
module.exports=router;