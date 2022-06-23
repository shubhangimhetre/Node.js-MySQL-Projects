const express=require('express');
const router =express.Router();

const serve= require('../controllers/registercontroller')
const serve2= require('../controllers/postcontroller');
const serve3=require('../controllers/likescontroller')
// const { verify } = require('jsonwebtoken');
const verify=require('../verifytoken');

//api/
router.post('/user/register',serve.register)
router.post('/user/login',verify,serve.login)
router.post('/posts/:user_id/post_blog',verify,serve2.post_blog)
router.get('/posts/read_all',serve2.read_all)
router.get('/posts/:user_id/read_blog',serve2.read_blog)
router.post('/posts/:post_id/like',serve3.post_like)
router.post('/posts/:post_id/dislike',serve3.post_dislike)
router.get('/posts/:post_id/read_likes',serve3.read_likes)



module.exports=router