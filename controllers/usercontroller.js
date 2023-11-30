const User=require('../models/newuser');

exports.addNewUser = async(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const existinguser= await User.findAll({where:{email:email}});
    if(!existinguser){
    const user=await User.create({
        name:name,
        email:email,
        password:password
    })
    res.status(201).json({newUser:user});
}
else{
    console.log("user already exists")
}

}