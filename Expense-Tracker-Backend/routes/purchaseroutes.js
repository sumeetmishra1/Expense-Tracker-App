const express=require('express');
const router=express.Router();
const Authoriz=require('../Middleware/auth.js');
const purchasecontroller = require('../Controllers/purchase.controller.js');

router.get('/premiummembership',Authoriz.authenticate,purchasecontroller.purchasepremium);
router.post('/updatetransactionstatus',Authoriz.authenticate,purchasecontroller.updateTransactionstatus)

module.exports=router;