const Expenses=require('../models/expenses');
const User=require("../models/newuser");
const sequelize = require('../utils/database');

exports.getleaderboard=async(req,res,next)=>{
    const leaderboard=await User.findAll({
        attributes:['id','name',[sequelize.fn('sum',sequelize.col('Expenses.amount')),'total_cost']],
        include:[
            {
                model:Expenses,
                attributes:[]
            }
        ],
        group:['User.id'],
        order:[['total_cost','DESC']]
    });
    res.status(200).json({leaderboard:leaderboard});
}