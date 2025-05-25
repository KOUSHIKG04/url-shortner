import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting.... to mongoDB server!!");
    await mongoose.connect(
      process.env.DATABASE_URL || "mongodb://localhost:27017/url-shortner"
    );
    console.log("Connected successfully");
  } catch (error) {
    console.log(`"Error connecting to MongoDB": ${error.message}`);
  }
};
