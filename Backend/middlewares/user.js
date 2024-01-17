const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.user= async(req,res,next)=>{
    const token = req.header("Authorization").replace("Bearer ","");
    if (!token){
        return res.status(201).json({
            message:"please authenticate with a valid token"
        })
    }
    try{

        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user= data;
        next();




    }catch{
        res.json({
            success:false,
            message:"error while decoding token"
        })

    }
}

module.exports=user;