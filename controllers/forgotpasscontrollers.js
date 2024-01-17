const Sib= require('sib-api-v3-sdk');
const path = require('path');
const bcrypt=require('bcrypt');
const {v4 : uuidv4 }=require('uuid');
const User=require('../models/user');
const Passwordmodel=require('../models/resetlink');
exports.forgotpassword=async(req,res,next)=>{
    //Generating Reset Link
    const useremail=req.body.email;
    const uniqueId=uuidv4();

    try{
        const user= await User.findOne({email:useremail});

        if(!user){
           return res.status(404).json({message:"User not Found"});
        }
        else{
           const password = new Passwordmodel({
                id:uniqueId,
                isActive:true,
                userId:user._id
            })


    //Email sending Process


    const path=`/password/verifyLink/${uniqueId}`;
    const client= Sib.ApiClient.instance;
    var apiKey= client.authentications['api-key'];
    const tranEmailApi = new Sib.TransactionalEmailsApi();
    apiKey.apiKey=process.env.API_KEY;
    const sender={
        email:'sumitsfs0@gmail.com'
    };
    const receivers=[
        {
            email:useremail
        }
    ]
    await tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:'Forgot Password',
        htmlContent:`<a href="${path}">Click here</a> to reset your Password`
    });
    console.log("donneeeeee");
    await password.save();
    return res.status(200).json({message:'done'});

    }
    }
    catch(e){
        res.status(500).json({message:e});
    } 
}
exports.verifyPasswordLink=async(req,res,next)=>{
    const uuid=req.params.uniqueId;
    try{
        const verify = await Passwordmodel.findOne({id:uuid});
        if(verify){
            if(verify.isActive){
                const file=path.join(__dirname,'.././Frontend/index.html');
                res.sendFile(file);
            }
            else{
                res.status(404).send("<h1>Link Already Used!</h1>")
            }
        }
        else{
            res.status(404).send("<h1> 404 Link not Found!</h1>");
        }
    }
   catch(e){
    res.status(500).json({e});
   }
}
exports.setnewpassword=async(req,res,next)=>{
    try{
        const user=await Passwordmodel.findOneAndUpdate({id:req.body.uuid},{
            isActive:false
        });
        const saltrounds=10;
        bcrypt.hash(req.body.password,saltrounds,async(err,hash)=>{
            const updateduser=await User.findOneAndUpdate({_id:user.userId},{password:hash});
            res.status(200).json({new:updateduser});
            })
    }
    catch(e){
        res.status(400).json({e});
    }
}