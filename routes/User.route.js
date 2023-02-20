const express=require("express")
const {UserModel}=require("../model/User.model")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")




userRouter.post("/register",async(req,res)=>{

    const {name,email,gender,password,age,city}=req.body

    try{
      const user=await UserModel.find({email})
      bcrypt.hash(password,5,async(err,hash)=>{
        if(err)res.send({"msg":"Something went wrong"})
        else if(user.length!=0){
          res.send({"msg":"User already registered"})
        }else{
          const user=new UserModel({name,email,gender,password:hash,age,city})
          await user.save()
          res.send({"msg":"New User has been registered"})
        }
      })
    
    }
    catch(err){
        console.log(err)
    }


})


userRouter.post("/login",async(req,res)=>{
  const {email,password}=req.body;
  try{
    const user=await UserModel.find({email})
    console.log(user)
    if(user.length>0){
       bcrypt.compare(password,user[0].password,(err,result)=>{
        console.log(user[0].password)
        if(result){
          let token=jwt.sign({userID:user[0]._id},"linkden",{
            expiresIn:"2h"
          })
          res.send({"msg":"Logged In","token":token})
        }else{
          res.send({"msg":"wrong Credentitals"})
        }
       })
    }
  }catch(err){
    res.send({"msg":"wrong Credentitals"})
  }
})

module.exports={
  userRouter
}