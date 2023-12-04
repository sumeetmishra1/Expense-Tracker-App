const Expenses=require('../models/expenses');
const User=require("../models/newuser");
const sequelize = require('../utils/database');

exports.getleaderboard=async(req,res,next)=>{
    try{
        const leaderboard=await User.findAll({
            attributes:['id','name','totalExpense'],
            group:['User.id'],
            order:[['totalExpense','DESC']]
        });
        res.status(200).json({leaderboard:leaderboard});
    }
    catch(e){
        res.status(500).json(e);
    }
    
}