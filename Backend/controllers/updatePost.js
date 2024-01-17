const Post = require('../models/Posts');

exports.updatePost = async (req, res) => {
  try {
    const { caption } = req.body;
    const newPost = {};
    if (caption) {
      newPost.caption = caption;
    }
   

    
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $set: newPost },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({
      message: "Updated",
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update" });
  }
};
