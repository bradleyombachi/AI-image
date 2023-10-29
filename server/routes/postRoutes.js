import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'
import Post from '../mongodb/models/post.js'
dotenv.config();

//var cloudinary = require('cloudinary');

const router = express.Router();

// cloudinary.config({
//   cloud_name: CLOUDINARY_CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_API_SECRET,
//   secure: true
// });

//GET ALL POSTS
router.route('/').get(async(req,res) => {
  try {
    const posts = await Post.find({});
    console.error(error)
    res.status(200).json({ success: true, data: posts})
  } catch (error) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again.'})

  }
})

//CREATE A POST
router.route('/').post(async(req,res) => {
  try {
    const {name, prompt, photo} = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo, { tags: "base64_upload"});

    const newPost = await Post.create({
      name, 
      prompt,
      photo: photoUrl.secure_url
    })
    res.status(201).json({ success: true, data: newPost })
  } catch (error) {
    res.status(500).json({ success: false, message: "Post failed" })
    const { name, prompt, photo} = req.body;
  }
})
export default router