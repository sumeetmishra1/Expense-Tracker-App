const expense=require('../models/expenses');
const user=require('../models/newuser');
exports.getexpense=async(req,res,next)=>{
    const data=await expense.findAll({where:{userId:req.user.id}});
    res.status(200).json({allExpense:data,ispremium:req.user.ispremiuimuser});
}
exports.addexpense=async(req,res,next)=>{
    const price=Number(req.body.amount);
    const description=req.body.descrip;
    const category=req.body.catgory;
    const id=req.user.id;
    const oldexpense=req.user.totalExpense;
    req.user.update({totalExpense:oldexpense+price});
    const data= await expense.create({
        amount:price,
        description:description,
        category:category,
        userId:id
    })
    res.status(201).json({newExpense:data});
};
exports.deleteexpense=async(req,res,next)=>{
    const expenseid=req.params.id;
    const userid=req.user.id;
    try{
        const data = await expense.destroy({where:{id:expenseid,userId:userid}})
        res.status(200).json({data:data});
    }
    catch(e){
        res.status(500).json({message:e});
    }
   
}