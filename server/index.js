import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import exerciseRoutes from './routes/exerciseRoutes.js';

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use(cors({
  origin: "http://127.0.0.1:5500", // or your front-end URL
  credentials: true
}));
// --- Connect to MongoDB ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use('/api/exercises', exerciseRoutes);


// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
