import mongoose from "mongoose";
import { config } from "dotenv";
config();
const dbURL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/testdb";
if (!dbURL) {
  throw new Error("Please Add Database URL in .env file");
}
const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
