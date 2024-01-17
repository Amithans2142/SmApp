const User = require('../models/User')
const Post = require('../models/Posts')
const user = require('../middlewares/user');
const Cloudinary = require('cloudinary').v2

function isFileTypeSupported (type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary (file,folder){
    const options = {folder}
    console.log("temp file path",file.tempFilePath,options)
    return await Cloudinary.uploader.upload(file.tempFilePath, options);

}

exports.createPost = async (req,res)=>{
    try{
        const {caption, image} = req.body;
        const UserId = req.user.checkUser.id;
        console.log("id",UserId);
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
        const user = await User.findById(UserId)
        if (!user){
            return res.json({
                message:"user not found"
            })
        }
        console.log("uploading to cloudinary");
        const response = await uploadFileToCloudinary(file, 'SmApp');
        console.log(response);

        const post = await Post.create({
            caption,
            image:response.secure_url,
            user
        })

        return res.json({
            success:true,
            message:"post uploaded successfully"
        })




    }catch (error) {
        console.error("Error while uploading post:", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while uploading post",
            error: error.message,
        });
    }
}

exports.allPosts = async (req,res)=>{
    try{
        const posts =await Post.find();
        res.json({
            success:true,
            message:"succesfully fetched",
            posts
        })

    }catch{
        res.json({
            success:false,
            message:"error while fetching posts"
        })

    }
}