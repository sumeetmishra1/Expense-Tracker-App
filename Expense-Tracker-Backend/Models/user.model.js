const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const userSchema= new Schema({
      name:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true
      },
      password:{
        type:String,
        required:true
      },
      ispremiuimuser:Boolean,
      totalExpense:Number,
      downloads:[
        {
          fileUrl:{
            type:String,
            required:true
          },
          downloadDate: {
            type: Date,
            default: Date.now
          }

        }
      ]
})

module.exports=mongoose.model('User',userSchema);
