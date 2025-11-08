import express from "express";
import Service from "../models/Service.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Add Service (Merchant only)
router.post("/add", protect, async (req, res) => {
  try {
    console.log("📩 Add service request body:", req.body);
    console.log("REQ USER:", req.user);

    if (req.user.role !== "merchant") {
      return res.status(403).json({ message: "Access forbidden" });
    }

    const { title, description, category, price, image } = req.body;

    // ✅ Validate required fields
    if (!title || !description || !price) {
      return res.status(400).json({ message: "Please provide title, description, and price" });
    }

    // ✅ Create new service
    const newService = new Service({
      merchant: req.user._id,
      title,
      description,
      category: category?.toLowerCase() || "other",
      price,
      image: image || "",
    });

    await newService.save();
    res.status(201).json({ message: "Service added successfully", service: newService });
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🧾 Fetch My Services
router.get("/my-services", protect, async (req, res) => {
  try {
    if (req.user.role !== "merchant") {
      return res.status(403).json({ message: "Access forbidden" });
    }

    const services = await Service.find({ merchant: req.user._id });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
