const express=require('express');
const router=express.Router();
const expensecontroller=require('../controllers/expensecontroller');
router.post('/addexpense',expensecontroller.addexpense);
router.get('/getexpense',expensecontroller.getexpense);
router.post('/delete/:id',expensecontroller.deleteexpense);
module.exports=router;