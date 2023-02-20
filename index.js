const express=require("express")
const {userRouter}=require("./routes/User.route")
const {postRouter}=require("./routes/Post.route")
const app=express()
require("dotenv").config()
app.use(express.json())
const {authentication}=require('./middleware/auth.middleware')
const {connection}=require("./db")
const cors=require("cors")
app.use(cors())


app.use("/user",userRouter)
app.use("/post",postRouter)
app.use(authentication)
app.get("/",(req,res)=>{
    res.send("Home")
})


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to db")
    }
    catch(err){
        console.log(err.message)
    }
    console.log(`Connect to ${process.env.port}`)
})