import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import giftRoutes from "./routes/giftRoutes.js";
import letterRoutes from "./routes/letterRoutes.js";
import poetryRoutes from "./routes/poetryRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// API Routes
app.use("/api/gifts", giftRoutes);
app.use("/api/letters", letterRoutes);
app.use("/api/poetry", poetryRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
