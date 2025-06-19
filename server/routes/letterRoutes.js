import express from "express";
import {
  createLetter,
  getLettersByUser,
  getLetterById,
  deleteLetter,
} from "../controllers/letterController.js";

const router = express.Router();

router.post("/create", createLetter);
router.get("/user/:userId", getLettersByUser);
router.get("/:letterId", getLetterById);
router.delete("/:letterId", deleteLetter);

export default router;
