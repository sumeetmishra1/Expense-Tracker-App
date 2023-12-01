const express=require('express');
const cors = require('cors');
const bodyparser=require('body-parser');
const userroutes=require('./routes/userroutes');
const expenseroutes=require('./routes/expenseroutes');
const sequelize=require('./utils/database');
const expense=require('./models/expenses');
const User=require('./models/newuser');
const app=express();
app.use(cors());
app.use(bodyparser.json({extended:false}));
app.use('/user',userroutes);
app.use('/expenses',expenseroutes);
User.hasMany(expense);
expense.belongsTo(User);
sequelize.sync().then(res=>{
    app.listen(3000);
}).catch(err=>console.log(err));