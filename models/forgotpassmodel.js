const Sequelize=require('sequelize');
const sequelize=require('../utils/database');
const passwordmodel=sequelize.define('forgotPassword',{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    isActive:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})
module.exports=passwordmodel;