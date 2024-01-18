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

exports.unlikePost = async (req, res) => {
    try {
        let like = await Likes.findById(req.params.id);

        if (!like) {
            return res.status(404).send("Not Found");
        }

        
        const postId = like.post;

       
        like = await Likes.findByIdAndDelete(req.params.id);

        if (!like) {
            return res.status(404).json({
                success: false,
                message: 'Like not found',
            });
        }

       
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: req.params.id } },
            { new: true }
        ).populate('likes').exec();

        res.json({
            success: true,
            message: 'unLiked successfully',
            updatedPost,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the like',
            error: error.message,
        });
    }
};