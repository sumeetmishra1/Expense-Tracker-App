const Sequelize=require('sequelize');
const sequelize=require('../utils/database');
const download = sequelize.define('download',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    fileUrl:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
module.exports=download