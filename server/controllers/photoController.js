import Photo from "../models/Photo.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// 📁 Storage engine (save locally under /uploads/)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/photos/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (JPG, PNG, WEBP)"));
    }
  },
});

// 🧠 Upload and store image metadata
export const uploadPhoto = async (req, res) => {
  const { userId } = req.body;
  const image = req.file;

  if (!image) return res.status(400).json({ error: "No image uploaded" });

  try {
    const newPhoto = new Photo({
      userId,
      imageUrl: `/uploads/photos/${image.filename}`,
      originalName: image.originalname,
    });

    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(500).json({ error: "Failed to save photo" });
  }
};

// 📸 Get all uploaded photos for a user
export const getUserPhotos = async (req, res) => {
  const { userId } = req.params;

  try {
    const photos = await Photo.find({ userId }).sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch photos" });
  }
};

// ❌ Delete a photo
export const deletePhoto = async (req, res) => {
  const { photoId } = req.params;

  try {
    const photo = await Photo.findById(photoId);
    if (!photo) return res.status(404).json({ error: "Photo not found" });

    const imagePath = path.join("uploads/photos", path.basename(photo.imageUrl));
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await photo.deleteOne();
    res.json({ message: "Photo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete photo" });
  }
};
