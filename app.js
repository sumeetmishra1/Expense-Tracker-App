const express=require('express');
const cors = require('cors');
const fs=require('fs');
const path =require('path');
const bodyparser=require('body-parser');
const userroutes=require('./routes/userroutes');
const expenseroutes=require('./routes/expenseroutes');
const purchaseroute=require('./routes/purchaseroutes');
const premiumroute=require('./routes/premiumroutes');
const passwordroute=require('./routes/passwordroutes');
const sequelize=require('./utils/database');
const expense=require('./models/expenses');
const User=require('./models/newuser');
const Order = require('./models/purchases');
const Download=require('./models/downloads');
const app=express();
//const helmet=require('helmet');
//const morgan=require('morgan')
require('dotenv').config();
app.use(cors());
app.use(bodyparser.json({extended:false}));
//app.use(helmet())
const accessLogStream=fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a'}
)
//app.use(morgan('combined',{stream:accessLogStream}));
app.use('/user',userroutes);
app.use('/expenses',expenseroutes);
app.use('/purchase',purchaseroute);
app.use('/premium',premiumroute);
app.use('/password',passwordroute);
app.use((req,res)=>{
    console.log('runned');
    res.sendFile(path.join(__dirname,`Expense-Trackerfrntend/${req.url}`))
})
User.hasMany(expense);
expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Download);
Download.belongsTo(User);

sequelize.sync().then(res=>{
    app.listen(3000);
}).catch(err=>console.log(err));