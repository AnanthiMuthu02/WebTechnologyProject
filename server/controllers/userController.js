const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const HttpError = require('../models/errorModel')




const registerUser = async(req , res, next) => {
    try{
        const{name, email, password, password2} = req.body;
        if(!name || !email || !password){
            return next(new HttpError("Fill in all the fields", 422))
        }
        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({email : newEmail})
        if(emailExists){
            return next(new HttpError("Email already exists", 422))
        }

        if((password.trim()).length < 6){
            return next(new HttpError("Password should be atleast 6 characters", 422))

        }

        if(password != password2){
            return next(new HttpError("Password do not match", 422))
        }

        const salt = await bcrypt.genSalt(10)
        console.log(salt);
        const hashedPass = await bcrypt.hash(password, salt);
        console.log(hashedPass);
        const newUser = await User.create({name, email:  newEmail, password: hashedPass})
        console.log(newUser);
        res.status(201).json(`New User ${newUser.email} registered`)

    }catch(error){
        return next(new HttpError("User Registration Failed", 422))


    }
}



const loginUser = async(req , res, next) => {
   try{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new HttpError("Fill in all the fields", 422))
    }
    const newEmail = email.toLowerCase()

    const user = await User.findOne({email : newEmail})
    if(!user){
        return next(new HttpError("Invalid Credentials", 422))
    }

    const comparePass = await bcrypt.compare(password, user.password)
    console.log(comparePass);
    if(!comparePass){
        return next(new HttpError("Invalid Credentials", 422)) 
    }
    const{_id: id, name} = user;
    const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1h"})
    console.log(token);
    res.status(200).json({token, id, name})
   }catch(error){
    return next(new HttpError("Login failed.Please check your credentials", 422))
   }
}

module.exports = {registerUser, loginUser}