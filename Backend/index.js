import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import productRoute from "./route/product.route.js"
import userRoute from "./route/user.route.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI; // Ensure this matches your .env file!
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);        

// Define the connection function
const connectDB = async () => {
  try {
    await mongoose.connect(URI); // 'await' makes the code wait for the connection
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1); // Stop the server if the database fails
  }
};

// definig routes
app.use("/product", productRoute);
app.use("/user", userRoute);

// Call the connection function
connectDB();

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});