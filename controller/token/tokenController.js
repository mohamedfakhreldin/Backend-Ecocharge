const tokenModel = require('../../DB/Model/tokensModel')
const bcrypt = require('bcrypt')
const userModel = require('../../DB/Model/userModel')
const {sendPasswordReset} = require('../../utils/sendEmail')
const {v4: uuid} = require('uuid')
async function createToken(req,res){
try {
const user=await userModel.findOne({email:req.body.email.toLowerCase()})
if (user) {
    const token = uuid()
await    tokenModel.deleteOne({user:user._id})
    await tokenModel.create({
        token,
        user:user._id
    })
    sendPasswordReset('passwordReset',req.body.email.toLowerCase(),token)
}
res.json('Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.')
} catch (error) {
    console.log(error);
}
}
async function checkToken(req,res){
    try {
    let token = await tokenModel.findOne({token:req.params.token})
    if (token)
    res.send(token)
    else
    res.status(422).send(false)

        
    } catch (error) {
     console.log(error);   
    }
}
async function passwordReset(req,res){
    try {
    let {password,cpassword,token}= req.body

    if (password && password === cpassword) {
        tokenFind = await tokenModel.findOne({token})
    if(tokenFind){

        password = await bcrypt.hash(password,10)
        await userModel.updateOne({_id:tokenFind.user},{password:password})
        await tokenModel.deleteOne({token})
        res.send(true)
    }else{
        res.send('unknown token')
    }
    }else{
        res.status(422).send('Password not identical')
    }

        
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    createToken,
    checkToken,
    passwordReset
}