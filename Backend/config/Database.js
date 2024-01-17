const mongoose = require('mongoose');
require('dotenv').config();

exports.connectToDb = ()=> {
    try{
        mongoose.connect(process.env.DATABASE_URL,{

            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('database connected')

    }catch{
        res.json({
            success:false,
            message:"error while connecting to database"
        })
        console.log("error while connecting to database");

    }
}