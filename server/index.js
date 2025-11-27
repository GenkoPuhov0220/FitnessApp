import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes
import authRoutes from "./routes/auth.js";
import exerciseRoutes from './routes/exerciseRoutes.js';
import measurementRoutes from './routes/measurementRoutes.js';
import programRoutes from './routes/programRoutes.js';
import calorieRoutes from './routes/calorieRoutes.js';
import mealProgramRoutes from './routes/mealPragramRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
//app.use(cors());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  process.env.FRONTEND_URL // твоя Netlify frontend
].filter(Boolean);

const corsOptions = {
  origin: function(origin, callback) {
    // allow requests with no origin (curl, Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// --- Connect to MongoDB ---
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/measurements', measurementRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/calories', calorieRoutes);
app.use('/api/mealprograms', mealProgramRoutes);

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
