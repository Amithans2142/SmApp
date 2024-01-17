const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    caption:{
        type:String,

    },
    image:{
        type:String
    },
    likes:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Likes"
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    }
}) 

module.exports=mongoose.model("Posts",postSchema);