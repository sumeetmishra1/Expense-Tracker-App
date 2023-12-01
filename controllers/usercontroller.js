const User=require('../models/newuser');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


function createToken(id,name){
    return jwt.sign({userId:id,name:name},'secretkey')
}
exports.addNewUser = async(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const existinguser= await User.findAll({where:{email:email}});
    try{
    if(existinguser.length>0){
        res.status(400).json({err:"User already exists!"});
        console.log("user already exists")
    }
    else{
        const saltrounds=10;
        bcrypt.hash(password,saltrounds,async(err,hash)=>{
            const user=await User.create({
                name:name,
                email:email,
                password:hash
            })
            res.status(201).json({newUser:user});
        })   
    }
    } 
    catch(e){
        res.status(500).json(err);
    }  
}
exports.loginUser=async(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    try{
    const user=await User.findAll({where:{email:email}});
    if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(err){
                res.status(500).json({message:"Something went Wrong"});
            }
            if(result==true){
                res.status(200).json({message:"User Login Sucessfull!",token: createToken(user[0].id,user[0].name)});
            }
            else{
                res.status(401).json({message:"Password is incorrect"});
            }
        })
    }
    else{
        res.status(404).json({message:"User Not Found"});
    }
}
catch(e){
    res.status(500).json({message:e})
}
}