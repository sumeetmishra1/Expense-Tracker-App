const expense=require('../models/expenses');
const sequelize=require('../utils/database')
exports.getexpense=async(req,res,next)=>{
    const data=await expense.findAll({where:{userId:req.user.id}});
    res.status(200).json({allExpense:data,ispremium:req.user.ispremiuimuser});
}
exports.addexpense=async(req,res,next)=>{
    const t = await sequelize.transaction();
    try{
    const price=Number(req.body.amount);
    const description=req.body.descrip;
    const category=req.body.catgory;
    const id=req.user.id;
    const oldexpense=req.user.totalExpense;
    const data= await expense.create({
        amount:price,
        description:description,
        category:category,
        userId:id
    },{transaction:t})
    await req.user.update({totalExpense:oldexpense+price},{transaction:t});
    await t.commit();
    res.status(201).json({newExpense:data});
    }
    catch(e){
        await t.rollback();
        res.status(400).json({e});
    }
    
};
exports.deleteexpense=async(req,res,next)=>{
    const expenseid=req.params.id;
    const oldexpense=req.user.totalExpense;
    const t = await sequelize.transaction()
    try{
        const exp = await expense.findByPk(expenseid);
        await exp.destroy();
        await req.user.update({totalExpense:oldexpense-exp.amount});
        await t.commit();
        res.status(200).json({exp});
    }
    catch(e){
        await t.rollback();
        res.status(500).json({message:e});
    }
   
}