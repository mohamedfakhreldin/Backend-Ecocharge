const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userModel = require("./DB/Model/userModel");

const jwt = require("jsonwebtoken");

const Users =
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "https://backend-ecocharge-v9vw.onrender.com/auth/google/callback",
			scope: ["profile", "email"],
		},
	async	function (accessToken, refreshToken, profile, callback) {
	//		console.log(profile);
            try {
                
                let {email,name}=profile._json
                let token
                let user = await userModel.findOne({email})
                if(user){
            
                     token=     jwt.sign({id:user.id,name:user.name,role:user.role, isLoggedIn: true},'mariam')
                }else{
                    let userSave = new userModel({email,name})
                    console.log(userSave);
                    await   userSave.save()
                token=     jwt.sign({id:userSave._id,name,role:userSave.role, isLoggedIn: true},'mariam')
                }
            
                callback(null,{token});
            }
            catch (error) {
             callback(null,{error});
		}}
	)
);

passport.serializeUser((user, done) => {

	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
