const jwt = require('jsonwebtoken');
const User=require('../Models/user.model.js');

exports.authenticate=async(req,res,next)=>{
    try{
        const token = req.header('Authorization');
        const user=jwt.verify(token,process.env.JWT_SECRET_KEY);
        User.findById(user.userId)
        .then(user=>{
            req.user=user;
            next();
        })
        .catch(err=>{console.log(err)});
    }
    catch(e){
        return res.status(401).json({e});
    }
}