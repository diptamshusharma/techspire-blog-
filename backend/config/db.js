// This file only has one job: connect to MongoDB using Mongoose.
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from backend/.env");
    }

    // MONGO_URI comes from the .env file, so the password is never written in our code
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    // Stop the server, because the app cannot work without a database
    process.exit(1);
  }
};

module.exports = connectDB;
