const express = require('express');
const app = express();
require('dotenv').config();
const { connectToDb } = require('./config/Database');
const route = require('./routes/route');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cloudinary = require('./utils/imageUploader');

app.use(bodyParser.json({ limit: '50mb' }));  // Use bodyParser before CORS middleware

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

cloudinary.connectToCloudinary();

const Port = process.env.PORT || 4000;

app.listen(Port, () => {
    console.log('Server is running at', Port);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.use('/', route);

app.get('/', (req, res) => {
    res.json('SmApp');
});

connectToDb();
