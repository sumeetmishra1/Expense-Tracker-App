const express=require('express');
const router=express.Router();
const Authoriz=require('../middleware/auth');
const purchasecontroller = require('../controllers/purchasecontroller');
router.get('/premiummembership',Authoriz.authenticate,purchasecontroller.purchasepremium);
router.post('/updatetransactionstatus',Authoriz.authenticate,purchasecontroller.updateTransactionstatus)
module.exports=router;