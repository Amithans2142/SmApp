const User = require('../models/User');
const Post = require('../models/Posts');
const user = require('../middlewares/user');
const Cloudinary = require('cloudinary').v2;
const path = require('path');

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    console.log("temp file path", file.tempFilePath, options);
    try {
        const response = await Cloudinary.uploader.upload(file.tempFilePath, options);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error.message);
        return { error };
    }
}

exports.createPost = async (req, res) => {
    try {
        const { caption, image } = req.body;
        const UserId = req.user.checkUser.id;
        console.log("id", UserId);
        const file = req.files && req.files.imageFile;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image file is missing",
            });
        }

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = path.extname(file.name).toLowerCase().substring(1);
        console.log("fileType", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.json({
                success: false,
                message: "File format not supported",
            });
        }

        const user = await User.findById(UserId);
        if (!user) {
            return res.json({
                message: "User not found",
            });
        }

        console.log("Uploading to Cloudinary");
        const response = await uploadFileToCloudinary(file, 'SmApp');
        console.log(response);

        const post = await Post.create({
            caption,
            image: response.secure_url,
            user,
        });

        return res.json({
            success: true,
            message: "Post uploaded successfully",
        });

    } catch (error) {
        console.error("Error while uploading post:", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while uploading post",
            error: error.message,
        });
    }
};

exports.allPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json({
            success: true,
            message: "Successfully fetched",
            posts,
        });

    } catch {
        res.json({
            success: false,
            message: "Error while fetching posts",
        });
    }
};
