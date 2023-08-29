const userModel = require("../DB/Model/userModel");
const jwt=require("jsonwebtoken")
const auth=(accessRoles)=>{
    return async(req,res,next)=>{
        const headerToken=req.headers['authorization'];
        try {
            if(headerToken == null || headerToken == undefined || !headerToken.startsWith("Bearer ")){
                res.json({message:"Invalid headerToken"}) 
            }else{
                const token=headerToken.split(" ")[1];
                if(!token || token == undefined || token.length <1){
                res.json({message:"Invalid token"}) 
                }else{
                    const decoded=jwt.verify(token,"mariam");
                    const findUser=await userModel.findById(decoded.id).select('id name email role');
                    if(!findUser){
                    res.json({message:"Invalid token user"}) 
                    }else{
                        console.log(findUser)
                        if(accessRoles.includes(findUser.role)){
                            console.log(accessRoles)
                            req.user =findUser;
                            next()
                        }else{
                            res.json({ message: "not authorize to do it" })
                        }
                        }
                }
            }       
            
        } catch (error) {
        res.status(400).json({message:"catch error" ,error}) 
            
        }
    }
}
module.exports={
    auth
}

