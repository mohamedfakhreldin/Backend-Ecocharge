const UserModel = require("../../DB/Model/userModel");
const Validator=require("../../utils/userValidation")
const fs=require("fs")
const cloudinary = require("../../utils/cloudinary");
const jwt = require("jsonwebtoken");

var GetAllUsers =async (req,res)=>{
   await UserModel.find((err,data)=>{
        res.status(200).json(data);
    });
   
}

var AddNewUser = async(req,res)=>{
    let { name, email, password, cpassword,role } =
    req.body;
    try
    {
    const {path}=req.file;
    console.log(path)
    const  result=await cloudinary.uploader.upload(path);
        const newUser=new UserModel(
            {
                name,
                email,
                password,
                cpassword,
                role,
                image:result.secure_url,
            }
            )
            await newUser.save();
            fs.unlinkSync(path);
            console.log("sucessfully")
    }
    catch(error){
    console.log(error)
    }
    
}

var GetUsersById =async (req,res)=>{
    try{
        const data = await UserModel.findById(req.params.id);
        // if(!data.image)
        // {
        //     data={...data,image:{data:fs.readFileSync("public/Images/3-8-2023-use.png")}}
        //     res.json(data)
        // }
        // else
         res.json(data)
        // res.send(data)
        // res.sendFile
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

var UpdateUser = async(req,res)=>{

    
    console.log(req.params)
    console.log(req.params.id)
    try {
        const UserId = req.params.id;
        // await UserModel.findById(req.params.id)
        // let User=await UserModel.findById(UserId);
       
      let User=await UserModel.findByIdAndUpdate(UserId,req.body,{new:true})
      User. token = jwt.sign(
        { id: User.id, name: User.name, role: User.role, isLoggedIn: true },
        "mariam"
      );
      delete User.password
      
        console.log("backend",User)
        res.status(200).json(User);
    }
    catch (error) {
        console.log("Error")
        res.status(400).json({ message: error.message })
    }
}


module.exports = {
  GetAllUsers,
  GetUsersById,
  UpdateUser,
  AddNewUser
};