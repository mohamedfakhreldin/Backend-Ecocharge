var express = require("express");
var router = new express.Router();
// const StudentsController = require("../Controllers/studentsController");
const UserController = require("../controller/users/UsersController");
const upload=require("../middlware/multer")

//Get All Users
router.get("/",UserController.GetAllUsers)
//Get user By Id
router.get("/getone/:id",upload.single('image'),UserController.GetUsersById)

//Add New User
router.post("/add",upload.single('image'),UserController.AddNewUser);

//Completely Update and Partial User By Id
router.put("/put/:id",upload.single('image'),UserController.UpdateUser)


module.exports = router;