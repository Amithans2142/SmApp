const Post = require('../models/Posts');

exports.deletePost = async (req, res) => {
        
    try {

        let post = await Post.findById(req.params.id);
        if(!post) {return res.status(404).send("Not Found")}


     
        post = await Post.findByIdAndDelete(req.params.id);
    
        if (!post) {
          
          return res.status(404).json({
            success: false,
            message: 'Post not found',
          });
        }
    
        
    
        res.json({
          success: true,
          message: 'Post deleted successfully',
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'An error occurred while deleting the post',
        });
      }
   
}
      
