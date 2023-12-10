const expense=require('../models/expenses');
const sequelize=require('../utils/database');;
const S3Services=require('../Services/s3services');
const UserServices=require('../Services/userservices');
const download=require('../models/downloads');
exports.downloadexpense=async(req,res,next)=>{
    try{
    const expenseall=await UserServices.getExpenses(req);
    const userID=req.user.id;
    const stringifiedData=JSON.stringify(expenseall);
    const filename=`Expense${userID}/${new Date()}.txt`;
    const fileUrl= await S3Services.uploadToS3(stringifiedData,filename);
    await download.create({
        fileUrl:fileUrl,
        userId:userID
    })
    res.status(200).json({fileUrl,success:true});
    }
    catch(err){
        res.status(500).json({fileUrl:'',success:false,err:err});
    }
}
exports.getlistofdownloads=async(req,res)=>{
    const item=await download.findAll({where:{userId:req.user.id}});
    res.status(200).json({allDownloads:item});
}
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