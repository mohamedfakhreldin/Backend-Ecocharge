const router = require("express").Router();
const usersController = require("../controller/Auth/authController");
const { auth } = require("../middlware/auth");
const upload=require("../middlware/multer");
router.post("/signup",upload.single('image'), usersController.signUp);
router.post("/signin", usersController.signIn);
router.get("/AllUsers",auth(["admin"]),usersController.allUsers );
router.get("/user/:id",auth(["admin"]) ,usersController.userById);
router.put(
  "/updateUser/:id",
  auth(["admin"]),
  usersController.updateUser
);
const DashboardController = require('../controller/dashboard/DashboardController')
router.get('/dashboard',DashboardController.dashboard)
router.delete(
  "/deleteUser/:id",
  auth(["admin"]),
 usersController.deleteUser
);
router.get('/checkA',auth(['admin']),(req,res)=>res.send(true))
router.get('/checkU',auth(['user','admin']),(req,res)=>res.send(true))
router.get('/activeaccount/:token',usersController.verifyEmail)
module.exports = router;
