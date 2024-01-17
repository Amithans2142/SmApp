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

    }catch (error) {
        console.error("Error while commenting:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error commenting due to some error",
            error: error.message,
        });
    }
}

exports.deleteComment = async (req,res)=> {
         
    try {
        

        let comment= await Comment.findById(req.params.id);
        if(!comment) {return res.status(404).send("Not Found")}


     
        comment = await Comment.findByIdAndDelete(req.params.id);
    
        if (!comment) {
          
          return res.status(404).json({
            success: false,
            message: 'Post not found',
          });
        }
    
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{comment:savedComment._id}},{new:true}).populate('comment').exec();
    
        res.json({
          success: true,
          message: 'Comment deleted successfully',
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'An error occurred while deleting the comment',
        });
      }
   
   
    
}