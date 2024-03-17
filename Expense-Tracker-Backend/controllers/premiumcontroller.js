
const User=require("../models/user");

exports.getleaderboard=async(req,res,next)=>{
    try{
       const leaderboard= await User.find()
        .select('id name totalExpense')
        .sort({ totalExpense: -1 })
        res.status(200).json({leaderboard:leaderboard});
    }
    catch(e){
        res.status(500).json(e);
    }
    
}