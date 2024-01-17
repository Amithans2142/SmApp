const User = require('../models/User')
const Post = require('../models/Posts')

exports.createPost = async (req,res)=>{
    try{
        const {caption, image} = req.body;
        const UserId = req.user._id;
        console.log("id",UserId);
        const user = await User.findById(UserId)
        if (!user){
            return res.json({
                message:"user not found"
            })
        }

        const post = Post.create({
            caption,
            image,
            user
        })

        return res.json({
            success:true,
            message:"post uploaded successfully"
        })




    }catch{
        res.json({
            success:false,
            message:"error while uploading post"
        })

    }
}