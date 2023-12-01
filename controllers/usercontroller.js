const User=require('../models/newuser');

exports.addNewUser = async(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const existinguser= await User.findAll({where:{email:email}});
    if(existinguser.length>0){
        res.status(400).json({err:"User already exists!"});
        console.log("user already exists")
    }
    else{
        const user=await User.create({
            name:name,
            email:email,
            password:password
        })
        res.status(201).json({newUser:user});
    }

}
exports.loginUser=async(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    const user=await User.findAll({where:{email:email}});
    if(user.length>0){
        if(user[0].password===password){
            res.status(200).json({message:"User Login Sucessfull!"});
        }
        else{
            res.status(401).json({err:"User not authorized"});
        }
    }
    else{
        res.status(404).json({err:"User Not Found"});
    }

}