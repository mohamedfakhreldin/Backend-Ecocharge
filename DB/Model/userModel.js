const mongoose=require("mongoose");
mongoose.set('strictQuery', false);
 const validator=require("validator")
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        pattern:"^[a-zA-Z]+$"
    },
    
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(val)=>{return validator.isEmail(val)},
            message:"Email Not Valid"
        }
        
    },
    password:{
        type:String,
       // required:true,
       pattern:"^[A-Z][a-z0-9]{3,8}$",

    },
    // vehicleType:{
    //     type:String,
    //     required:true,
      
    // }, 
    // chargerType:{
    //     type:String,
    //     required:true,
      
    // },
    token:{
        type:String,
//        required:true,
        unique:true
    },
    created_at:{
        type:Date,
        index: {
            expires: '1h'
          }
            },
    role: { type: String, default: 'user' },
    image:{ type: String,
    default:'https://res.cloudinary.com/dqeuhyyic/image/upload/v1678468805/jm1defzhyuzqori1jltc.png'
    },
  
},{
    timestamps:true
})
const userModel=mongoose.model("Auth",userSchema);
module.exports=userModel