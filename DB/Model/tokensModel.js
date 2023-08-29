const mongoose=require("mongoose");
mongoose.set('strictQuery', false);
 const validator=require("validator")
const tokenSchema= new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true,
      },
    createdAt:{
        type:Date,
        default:Date.now,
        index: {
            expires: '1h'
          }

    }
    ,})

    const tokenModel=mongoose.model("Token",tokenSchema);
    module.exports=tokenModel 