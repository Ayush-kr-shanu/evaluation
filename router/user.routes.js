const express=require('express')
const { UserModel } = require('../model/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userRoute=express.Router()

userRoute.post('/register',async(req,res)=>{
    const {name, email, gender, password, age, city}=req.body
    try {
       bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            res.send({"msg":"something went wrong", error:err.message})
        }else{
            const user=new UserModel({name, email, gender, password:hash, age, city})
            await user.save()
            res.send('User has been registered')
        }
       })
     } catch (err) {
        res.send({"msg":"something went wrong", error:err.message})
    }
})


userRoute.post('/login',async(req,res)=>{
    const {email, password}=req.body
    try {
        const user= await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password, (err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},'masai')
                    res.send({"msg":"user has been logged-in", "token":token})
                }else{
                    res.send({"msg":"Wrong credential"})
                }
            })
        }else{
            res.send({"msg":"Wrong credential"})
        }
    } catch (err) {
        res.send({"msg":"something went wrong", error:err.message})
    }
})

module.exports={
    userRoute
}