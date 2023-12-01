const expense=require('../models/expenses');
exports.getexpense=async(req,res,next)=>{
    const data=await expense.findAll();
    res.status(200).json({allExpense:data});

}
exports.addexpense=async(req,res,next)=>{
    const price=req.body.amount;
    const description=req.body.descrip;
    const category=req.body.catgory;
    const data= await expense.create({
        amount:price,
        description:description,
        category:category
    })
    res.status(201).json({newExpense:data});
};
exports.deleteexpense=async(req,res,next)=>{
    const expenseid=req.params.id;
    const data=await expense.findByPk(expenseid);
    data.destroy();
    res.status(200).json({data:data});
}