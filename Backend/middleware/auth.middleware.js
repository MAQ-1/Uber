const userModel =require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');
const dotenv = require('dotenv');
dotenv.config();

module.exports.authUser=async(req,res,next)=>{
    const token =req.cookies?.token || req.header('Authorization')?.replace('Bearer ','');
    
    const isBlacklisted = await blacklistModel.findOne({token:token});
    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"});
    }
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    console.log("Token received in auth middleware:", token);

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId);

        req.user = user;
        return next();
    }catch(error){
        console.log("Error authenticating user:",error);
        res.status(401).json({message:"Error authenticating user"});
    }
}