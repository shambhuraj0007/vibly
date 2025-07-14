const jwt=require('jsonwebtoken');
const responce=require('../utils/responceHandler');

const authMiddleware=(req,res,next)=>{
    const authToken=req?.cookies?.auth_token;;
    if(!authToken){
        return responce(res,401,"Authentication token is missing, please login to continue");
    }
    try {
        const decoded=jwt.verify(authToken,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return responce(res,401,"Invalid token or token expired, pls try logging in again");
    }
}
module.exports={authMiddleware};