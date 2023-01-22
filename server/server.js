import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import dalleRoutes from './routes/dalleRoutes.js';
import postRoutes from './routes/postRoutes.js';

// Parse the environment variables
dotenv.config();

// Express server instance
const app = express();
export const prisma = new PrismaClient();

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Business Routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// Routes
app.get('/', async (req, res) => {
	res.send('Hello from DALL-E 2.0');
});

async function run() {
	try {
		await prisma.$connect();
		app.listen(8080, () => console.log('Server is up and running at http://localhost:8080'));
	} catch (err) {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	}
}

run();
