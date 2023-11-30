const express=require('express');
const cors = require('cors');
const bodyparser=require('body-parser');
const userroutes=require('./routes/userroutes');
const sequelize=require('./utils/database')
const app=express();
app.use(cors());
app.use(bodyparser.json({extended:false}));
app.use('/user',userroutes);
sequelize.sync().then(res=>{
    app.listen(3000);
}).catch(err=>console.log(err));