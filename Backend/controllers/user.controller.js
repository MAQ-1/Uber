const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

// Register a new user
module.exports.registerUser = async (req, res,next) => {
    try{
         const errors= validationResult(req);
         if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
         }

         const{Fullname,email,password}= req.body;

         const hashedPassword= await userModel.hashPassword(password);

         const user = await userService.createUser({
            Firstname:Fullname.Firstname,
            Lastname:Fullname.Lastname,
            email,
            password:hashedPassword
         });
  
          const token = user.generateAuthToken();


          res.status(201).json({
            message:"User registered successfully",
            token,
            user
          });

    }catch(error){
        console.log("Error registering user:", error);
        res.status(500).json(
            {message:"Error registering user"
        });
    }
}

// login a user
module.exports.loginuser=async(req,res)=>{
try{

}catch(error){
    console.log("Error Logging the user:", error);
    res.status(500).json(
        {message:"Error logging the user"
    });
}
}