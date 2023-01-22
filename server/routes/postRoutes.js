import { v2 as cloudinary } from 'cloudinary';
import { Router } from 'express';
import Post from '../database/Post.js';

const router = Router();
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handleGetPosts(req, res) {
	try {
		const posts = await Post.find({});
		res.status(200).json({ success: true, data: posts });
	} catch (err) {
		res.status(500).json({ success: false, message: err });
	}
}

async function createPost(req, res) {
	try {
		const { name, prompt, photo } = req.body;
		const photoUrl = await cloudinary.uploader.upload(photo);
		const newPost = new Post({ name, prompt, photo: photoUrl.secure_url });
		const result = await newPost.save();
		res.status(201).json({ success: true, data: result });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ success: false, message: err.message });
	}
}

router.route('/').get(handleGetPosts).post(createPost);

export default router;
