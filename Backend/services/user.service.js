const userModel =require('../models/user.model');


module.exports.createUser = async ({
    Firstname,
    Lastname,
    email,
    password
}) => {
    if(!Firstname || !email || !password){
        throw new Error("All fields are required");
    }

    const user= userModel.create({
        Fullname:{
            Firstname,
            Lastname
        },
        email,
        password
    });
    return user;
}