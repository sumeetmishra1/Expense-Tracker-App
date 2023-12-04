const Expenses=require('../models/expenses');


exports.getleaderboard=async(req,res,next)=>{
    const expense=await Expenses.findAll();
    let map1=new Map();
    for(var i=0;i<expense.length;i++){
        if(map1.has(expense[i].userId)){
            let amt=map1.get(expense[i].userId)+expense[i].amount;
            map1.set(expense[i].userId,amt);
        }
        else{
        map1.set(expense[i].userId,expense[i].amount);
        }
    }
    res.status(200).json({leaderboard:map1});
}