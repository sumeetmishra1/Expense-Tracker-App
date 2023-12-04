const expense=require('../models/expenses');
const User = require('../models/newuser');
const user=require('../models/newuser');
const sequelize=require('../utils/database')
exports.getexpense=async(req,res,next)=>{
    const data=await expense.findAll({where:{userId:req.user.id}});
    res.status(200).json({allExpense:data,ispremium:req.user.ispremiuimuser});
}
exports.addexpense=async(req,res,next)=>{
    const t = await sequelize.transaction()
    const price=Number(req.body.amount);
    const description=req.body.descrip;
    const category=req.body.catgory;
    const id=req.user.id;
    const oldexpense=req.user.totalExpense;
    await req.user.update({totalExpense:oldexpense+price},{transaction:t});
    const data= await expense.create({
        amount:price,
        description:description,
        category:category,
        userId:id
    },{transaction:t})
    await t.commit();
    res.status(201).json({newExpense:data});
};
exports.deleteexpense=async(req,res,next)=>{
    const expenseid=req.params.id;
    const oldexpense=req.user.totalExpense;
    try{
        const exp = await expense.findByPk(expenseid);
        await exp.destroy();
        await req.user.update({totalExpense:oldexpense-exp.amount});
        res.status(200).json({exp});
    }
    catch(e){
        res.status(500).json({message:e});
    }
   
}