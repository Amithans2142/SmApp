const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Cloudinary = require('cloudinary').v2

function isFileTypeSupported (type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary (file,folder){
    const options = {folder}
    console.log("temp file path",file.tempFilePath,options)
    return await Cloudinary.uploader.upload(file.tempFilePath, options);

}



//User Registration

exports.newUser= async (req,res)=>{
    try{
        const {name,email,contact,password,profilePic} = req.body;
        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("fileType",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.json({
                success:false,
                message:"file format not supported"
            })

        }
        if(!name || !email || !contact || !password ){
            return res.json({
                success:false,
                message:"all fields are required"
            })
        }
        let hashedPassword = await bcrypt.hash(password,10);
        if(!hashedPassword){
            return res.json({
                success:false,
                message:"error while hashing password"
            })
        }

        console.log("uploading to cloudinary");
        const response = await uploadFileToCloudinary(file, 'SmApp');
        console.log(response);

        const savedUser = await User.create({
            name,
            email,
            contact,
            password:hashedPassword,
            profilePic:response.secure_url
        });

        return res.json({
            success:true,
            message:"User registered successfuly",
            data:savedUser
        })


    }catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({
            success: false,
            message: "Error while login process",
            error: error.message, 
        });
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
        const checkUser = await User.findOne({email});
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