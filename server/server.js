import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import connect from './database/connect.js';
import dalleRoutes from './routes/dalleRoutes.js';
import postRoutes from './routes/postRoutes.js';

// Parse the environment variables
dotenv.config();

// Express server instance
const app = express();

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

// Connect to the mongodb server and start the server
connect(() => {
	const PORT = process.env.PORT || 8080;
	app.listen(PORT, () => console.log(`Server up and running at http://localhost:${PORT}`));
});
