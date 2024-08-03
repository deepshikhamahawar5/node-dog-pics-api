const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('MongoDB connected');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            process.exit(1); // Exit process with failure
        }
    }
};

module.exports = connectDB;
