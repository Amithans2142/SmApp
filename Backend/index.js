const express = require('express');
const app = express();
require('dotenv').config();
const {connectToDb}=require('./config/Database');

const Port = process.env.PORT || 4000;

app.listen(Port,()=>{
    console.log('Server is running at',Port);

})

app.use('/',(req,res)=>{
    res.send('SmApp')

})
connectToDb();