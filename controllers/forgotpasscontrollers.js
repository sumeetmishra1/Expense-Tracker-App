const Sib= require('sib-api-v3-sdk');
const path = require('path');
const bcrypt=require('bcrypt');
const {v4 : uuidv4 }=require('uuid');
const User=require('../models/newuser');
const Passwordmodel=require('../models/forgotpassmodel');
exports.forgotpassword=async(req,res,next)=>{
    //Generating Reset Link
    const useremail=req.body.email;
    const uniqueId=uuidv4();
    try{
        const user= await User.findOne({where:{email:useremail}});
        if(!user){
           return res.status(404).json({message:"User not Found"});
        }
        else{
           const password= await Passwordmodel.create({
                id:uniqueId,
                isActive:true,
                userId:user.id
            })
        }
    }
    catch(e){
        console.log(password);
        res.status(500).json({message:e});
    } 

    //Email sending Process
    const path=`http://localhost:3000/password/verifyLink/${uniqueId}`;
    const client= Sib.ApiClient.instance;
    var apiKey= client.authentications['api-key'];
    const tranEmailApi = new Sib.TransactionalEmailsApi();
    apiKey.apiKey=`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`;
    const sender={
        email:'sumitsfs0@gmail.com'
    };
    const receivers=[
        {
            email:useremail
        }
    ]
    try{
    await tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:'Forgot Password',
        htmlContent:`<a href="${path}">Click here</a> to reset your Password`
    });
    console.log("donneeeeee");
    return res.status(200).json({message:'done'});
    }
    catch(e){
        console.log(e.message);
    }
    
}
exports.verifyPasswordLink=async(req,res,next)=>{
    const uuid=req.params.uniqueId;
    try{
        const verify = await Passwordmodel.findOne({where:{id:uuid}});
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
   const user=await Passwordmodel.findOne({where:{id:req.body.uuid}});
   await user.update({isActive:false});
   const saltrounds=10;
    bcrypt.hash(req.body.password,saltrounds,async(err,hash)=>{
    const updateduser=await User.update({password:hash},{where:{id:user.userId}});
    res.status(200).json({new:updateduser});
    })
}