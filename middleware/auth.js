const jwt = require('jsonwebtoken');
const User=require('../models/newuser');
exports.authenticate=async(req,res,next)=>{
    try{
        const token = req.header('Authorization');
        const user=jwt.verify(token,'secretkey');
        console.log('user id',user.userId)
        User.findByPk(user.userId)
        .then(user=>{
            req.user=user;
            next();
        })
        .catch(err=>{throw new Error(err)});
    }
    catch(e){
        return res.status(401).json({e});
    }
}