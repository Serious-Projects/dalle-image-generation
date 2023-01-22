import { v2 as cloudinary } from 'cloudinary';
import { Router } from 'express';
import { prisma } from '../server.js';

const router = Router();
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handleGetPosts(req, res) {
	try {
		const posts = await prisma.post.findMany();
		res.status(200).json({ success: true, data: posts });
	} catch (err) {
		res.status(500).json({ success: false, message: err });
	}
}

async function createPost(req, res) {
	try {
		const { name, prompt, photo } = req.body;
		const photoUrl = await cloudinary.uploader.upload(photo);
		const newPost = await prisma.post.create({
			data: { name, prompt, photo: photoUrl.secure_url },
		});
		res.status(201).json({ success: true, data: newPost });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
}

router.route('/').get(handleGetPosts).post(createPost);

export default router;
