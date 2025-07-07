const mongoose =require('mongoose');
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,// Use the new URL parser to avoid deprecation warnings
            useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
};
module.exports = connectDb;