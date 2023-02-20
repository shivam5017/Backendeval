const jwt=require("jsonwebtoken")


const authentication=(req,res,next)=>{

    const token=req.headers.authorization
    if(token){
       const decoded=jwt.verify(token,process.env.key)
       if(decoded){
        const userID=decoded.userID
        next()
       }else{
        res.send({"msg":"Login first"})
       }
    }else{
        res.send({"msg":"login first"})
    }

}
module.exports={
    authentication
}