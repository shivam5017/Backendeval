const express=require("express")
const {PostModel}=require("../model/Post.model")
const postRouter=express.Router()
//
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
//


postRouter.get("/",(req,res)=>{
    res.send("ALL Posts")
})


postRouter.post("/create",async(req,res)=>{
   const payload=req.body;

   try{
    const new_post=new PostModel(payload)
    await new_post.save()
    res.send("Created the Post")
   }
   catch(err){
    console.log(err)
    res.send({"msg":"Something went wrong"})
   }

})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id})
    const userId_in=post.userID
    const userId_make=req.body.userID

    try{
       if(userId_make!==userId_in){
        res.send({"msg":"You are not Authorized"})
       }else{
        await PostModel.findByIdAndUpdate({"_id":id})
        res.send("Updated the Post")
       }
    }
    catch(err){
     console.log(err)
     res.send({"msg":"Something went wrong"})
    }



})

postRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try{
         await PostModel.findByIdAndDelete({"_id":id})
         res.send({"msg":"Post Successfull deleted"})
    }
    catch(err){
        res.send({"msg":"Something went wrong"})
    }
})



module.exports={
    postRouter
}