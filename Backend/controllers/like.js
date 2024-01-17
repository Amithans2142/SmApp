const User = require('../models/User');
const Likes = require('../models/Likes');
const Post = require('../models/Posts');

exports.likePost = async (req,res)=>{
    try{
        const {post,user} = req.body;
        

        const savedLiked = await Likes.create({
            post,
            user
        })

        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{likes:savedLiked._id}},{new:true}).populate('likes').exec();

        return res.json({
            success:true,
            message:"post liked succesfully"
        })

    }catch{
        return res.json({
            success:false,
            message:"post does not liked due to some error"

        })

    }
}