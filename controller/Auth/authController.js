const userModel = require("../../DB/Model/userModel");
const validateUser = require("../../utils/userValidation");
const validateUserAdmin = require("../../utils/userValidationAdmin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs=require("fs");
MailController = require('../../utils/sendEmail')
const cloudinary = require("../../utils/cloudinary");
const { 
    v4: uuidv4,
} = require('uuid');
const { sendEmail,sendEmailActivation } = require("../../utils/sendEmail");

const signUp = async (req, res) => {
  let { name, email, password, cpassword,role } =
    req.body;
    email = email.trim().toLowerCase()
    name = name.trim()
  try {
    if (password === cpassword) {
      const validate = validateUser({
        name,
        email,
        password,
  
        role,
      });
      if (validate) {
        const findUser = await userModel
          .findOne({ email })
          .select("-_id email");
        if (findUser) {
          res.json({ message: "email is already exists" });
        } else {
          const token = uuidv4()

          const hashPassword = await bcrypt.hash(password, 10);
          let savedUser = await userModel.insertMany({
            name,
            email,
            password: hashPassword,
            token,
            created_at:Date.now(),
            role,
          });
          sendEmailActivation('emailVerify',email,token)
            res
            .status(201)
            .json({ message: "user registered successed", savedUser });
        }
      } else {
        res.status(400).json({ message: validateUser.errors });
      }
    } else {
      res.json({ message: "password and cpassword doesn't match" });
    }
  } catch (error) {
    res.json({ message: "falied register", error });
  }
};
// const signUp = async (req, res) => {
//   let { name, email, password, cpassword,role } =
//     req.body;
//     // upload the image to cloudinary
   
   
//     email = email.trim().toLowerCase()
//     name = name.trim()
//   try {
//     const {path}=req.file;
//     console.log(path)
//     const  result=await cloudinary.uploader.upload(path);
//     let image=result.secure_url;
//     if (password === cpassword) {
//       console.log("pass=cpass")
//       const validate = validateUser({
//         name,
//         email,
//         password,
//         role,
//         image,
//       });
//       console.log(image)
//       if (validate) {
//         const findUser = await userModel
//           .findOne({ email })
//           .select("-_id email");
//         if (findUser) {
//           res.json({ message: "email is already exists" });
//         } else {
//           const token = uuidv4()
//           const hashPassword = await bcrypt.hash(password, 10);
//           let savedUser = await userModel.insertMany({
//             name,
//             email,
//             password: hashPassword,
//             token,
//             created_at:Date.now(),
//             role,
//             image,
//           });
         
//           sendEmailActivation('emailVerify',email,token)
//             res
//             .status(201)
//             .json({ message: "user registered successed", savedUser });
//             fs.unlinkSync(path);
//         }
//       } else {
//         res.status(400).json({ message: validateUser.errors });
//       }
//     } else {
//       res.json({ message: "password and cpassword doesn't match" });
//     }
//   } catch (error) {
//     res.json({ message: "falied register",error });
//   }
// };

const signIn = async (req, res) => {
  let { email, password } = req.body;
  email = email.trim().toLowerCase()
    
  try {
    const user = await userModel.findOne({ email,  token: { $exists:false } });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { id: user.id, name: user.name, role: user.role, isLoggedIn: true },
          "mariam"
        );
        res.status(201).json({ message: "signin successfully", token });
      } else {
        res.json({ message: "Invalid password" });
      }
    } else {
      res.json({ message: "email or password invalid" });
    }
  } catch (error) {
    res.json({ message: "falied signin", error });
  }
};
const verifyEmail=async(req,res)=>{
  try {
  
let token= await userModel.findOne({token:req.params.token})

  
  if(token){
  await userModel.updateOne({token:req.params.token},{$unset:{token:1,created_at:1}})
    res.redirect(process.env.CLIENT_DOMAIN+'/signin')
  }else{

    res.send('unknown token')
  }
} catch (error) {
  console.log(error);
  res.status(500).send('server error')
}
}
////////All Users
const allUsers = async (req, res) => {
  try {
    const users = await userModel.find({role:"user"});
    res.json({ message: "All Users", data: users });
  } catch (errors) {
    res.json({ message: "errors", ...errors });
  }
};
////delete Users
const deleteUser = async (req, res) => {
  let { id } = req.params;
  try {
    const user = await userModel.deleteOne({ _id: id });
    res.json({ message: "deleted sucess", user });
  } catch (errors) {
    res.json({ message: "deleted error", ...errors });
  }
};
///update User
const updateUser = async (req, res) => {
  console.log('test')
  let { id } = req.params;
  let {
name,email,password
  } = req.body;
  
  try {
  
    console.log('password');
    
    if (password) {
      console.log('password');
      console.log(password);
      const validate = validateUserAdmin({
        name,email,password
      });
        if (validate) {
        
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await userModel.updateOne(
          { _id: id },
          {
            name,email,password:hashPassword
          }
          );
          res.json({ message: "updated success", user });
        }
        else {
          res.json({ message: validateUser.errors });
        }
      }else{
        const validate = validateUserAdmin({
          name,email
        });
        if (validate) {
            console.log('password');
            
          
          const user = await userModel.updateOne(
            { _id: id },
            {
              name,email
            }
            );
        
            res.json({ message: "updated success", user });
          }
          else {
            res.json({ message: validateUser.errors });
          }

    }
  } catch (err) {
    res.json({ message: "updated error", ...err });
  }
};
/////////user by id
const userById = async (req, res) => {
  let { id } = req.params;
  try {
    const user = await userModel.findOne({ _id: id });
    res.json({ message: "one user By Id", data: user });
  } catch (errors) {
    res.json({ message: "errors", ...errors });
  }
};


module.exports = {
  signUp,
  verifyEmail,
  signIn,
  allUsers,
  deleteUser,
  updateUser,
  userById
};
