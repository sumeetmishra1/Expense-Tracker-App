const Order=require('../models/purchase');
const User=require('../models/user');
const Razorpay=require('razorpay');
exports.purchasepremium=async(req,res)=>{
    try{
        var rzp=new Razorpay({
            key_id:process.env.RZP_KEY_ID,
            key_secret:process.env.RZP_KEY_SECRET
        })
        const amount=2500;
        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            const purchase=new Order({
                orderId:order.id,
                status:'PENDING',
                userId:req.user._id
            })
            purchase.save()
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
       const order= await Order.findOneAndUpdate({orderId:order_id},{
            paymentId:payment_id,
            status:'SUCCESSFULL'
       })
       await User.findByIdAndUpdate(req.user._id,{
        ispremiuimuser:true
       })
        return res.status(202).json({sucess:true,message:"Transaction Successfull"});
    }
    catch(e){
        res.status(500).json({message:e});
    }
}