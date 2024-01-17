const express = require('express');
const app = express();
const route = express.Router();
const {newUser,login} = require('../controllers/auth');
const {createPost} = require('../controllers/post');
const {likePost} = require('../controllers/like');
const {commentOnPost,deleteComment} = require('../controllers/comment');
const {allPosts} = require('../controllers/post');
const {deletePost} = require('../controllers/deletePost');
const {updatePost} = require('../controllers/updatePost');
const user = require('../middlewares/user');

route.post('/register',newUser);
route.post('/login',login);
app.use(user);
route.post('/create',user,createPost);
route.post('/like',user,likePost);
route.post('/comment',user,commentOnPost);
route.get('/posts',user,allPosts);
route.delete('/delete/:id',deletePost);
route.put('/update/:id',updatePost);
route.delete('/delete-comment/:id',deleteComment);

module.exports = route;
