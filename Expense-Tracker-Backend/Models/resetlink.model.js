const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetLinkSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})
module.exports= mongoose.model('resetlink',resetLinkSchema)
