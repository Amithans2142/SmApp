const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Posts');

exports.commentOnPost = async (req,res)=>{
    try{
        const {post,user,comment} = req.body;
        const savedComment =await Comment.create({
            post,user,comment
        });
        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{comment:savedComment._id}},{new:true}).populate('comment').exec();
        
        return res.json({
            success:true,
            message:"commented on post"
        })

    }catch{
        return res.json({
            success:false,
            message:"error commenting due to some error"
        })

    }
}