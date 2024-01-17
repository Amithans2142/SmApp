const express = require('express');
const app = express();
require('dotenv').config();
const {connectToDb}=require('./config/Database');
const route = require('./routes/route');
app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
const cloudinary = require('../Backend/utils/imageUploader');
cloudinary.connectToCloudinary();

const Port = process.env.PORT || 4000;

app.listen(Port,()=>{
    console.log('Server is running at',Port);

})


app.use('/',route)
app.get('/',(req,res)=>{
    res.json('SmApp');
})
connectToDb();