const Order=require('../models/purchases');
const User=require('../models/newuser');
const Razorpay=require('razorpay');
exports.purchasepremium=async(req,res)=>{
    try{
        var rzp=new Razorpay({
            key_id:'rzp_test_ZRVmBRMVL0SHcq',
            key_secret:'ToIQVYhn6846ZPvFwfzn4aAs'
        })
        const amount=2500;
        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderId:order.id,status:'PENDING'})
            .then(()=>{
                return res.status(201).json({order,key_id : rzp.key_id});
            })
            .catch(err=>{
                throw new Error(err);
            })

        })
    }
    catch(e){
        console.log(e);
        res.status(401).json({message:'Something went wrong',error:err});
    }
}
exports.updateTransactionstatus= async(req,res)=>{
    try{
        const{payment_id, order_id}=req.body;
       const order= await Order.findOne({where:{orderId:order_id}})
       const promise1 = order.update({paymentId:payment_id,status:'SUCCESSFULL'})
       const promise2 =  req.user.update({ispremiuimuser:true});
       Promise.all([promise1,promise2]).then(()=>{
        return res.status(202).json({sucess:true,message:"Transaction Successfull"});
       })
       .catch((err)=>{
        throw new Error(err);
       })
    }
    catch(e){
        res.status(500).json({message:e});
    }
}