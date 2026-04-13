const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema= new mongoose.Schema({
    Fullname:{
          Firstname:{
            type:String,
            required:true,
            minlength:[3,"Firstname should be at least 3 characters long"],
          },
           Lastname:{
            type:String,
            
          },

    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please enter a valid email address"]
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[6,"Password should be at least 6 characters long"]   
    },
    socketId:{
        type:String,

    }
})

// Generate JWT token for authentication
userSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

// Compare the provided password with the stored hashed password
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);

}

// Hash the password before saving the user
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}   

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;