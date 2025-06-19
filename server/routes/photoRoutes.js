import express from "express";
import {
  upload,
  uploadPhoto,
  getUserPhotos,
  deletePhoto,
} from "../controllers/photoController.js";

const router = express.Router();

// POST /api/photos/upload
router.post("/upload", upload.single("image"), uploadPhoto);

// GET /api/photos/user/:userId
router.get("/user/:userId", getUserPhotos);

// DELETE /api/photos/:photoId
router.delete("/:photoId", deletePhoto);

export default router;
