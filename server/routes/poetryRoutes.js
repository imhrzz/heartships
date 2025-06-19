import express from "express";
import { generatePoem } from "../controllers/poetryController.js";

const router = express.Router();

// POST /api/poetry/generate
router.post("/generate", generatePoem);

export default router;
