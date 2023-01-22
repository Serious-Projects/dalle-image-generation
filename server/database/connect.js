import mongoose from 'mongoose';

function connect(cb) {
	mongoose.set('strictQuery', true);
	mongoose
		.connect(process.env.MONGODB_URL)
		.then(() => {
			console.log('Connected to MongoDB Database');
			cb();
		})
		.catch((err) => {
			console.error(err);
			process.exit(1);
		});
}

export default connect;
