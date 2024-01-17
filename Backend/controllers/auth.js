const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//User Registration

exports.newUser= async (req,res)=>{
    try{
        const {name,email,contact,password,profilePic} = req.body;
        if(!name || !email || !contact || !password ||!profilePic){
            return res.json({
                success:false,
                message:"all fields are required"
            })
        }
        let hashedPassword = bcrypt.hash(password,10);
        if(!hashedPassword){
            return res.json({
                success:false,
                message:"error while hashing password"
            })
        }

        const savedUser = await User.create({
            name,
            email,
            contact,
            password:hashedPassword,
            profilePic
        });

        return res.json({
            success:true,
            message:"User registered successfuly",
            data:savedUser
        })


    }catch{
        res.json({
            success:false,
            message:"error while registering"
        })

    }
}

//Login 

exports.login=async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.json({
                success:false,
                message:"all fields are required"
            })
        }
        const checkUser = await User.find({email});
        if(!checkUser){
            return res.json({
                success:false,
                message:"user not found"
            })
        }
        const passwordMatch = bcrypt.compare(password, checkUser.password);

        if(!passwordMatch){
            return res.json({
                success:false,
                message:"password does not matched"
            })
        }

        const payload = {
            checkUser:{
                id:checkUser._id,
                name:checkUser.name,
                email:checkUser.email,
                contact:checkUser.contact,
                profilePic:checkUser.profilePic
            }
        }

        //generate token

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});

        return res.json({
            success:true,
            message:"Login succesfully",
            token
        })



    }catch{
        res.json({
            success:false,
            message:"error while login proccess"
        })

    }
}