import express from "express";
import Service from "../models/Service.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* -------------------------------------------------------
   ADD SERVICE (MERCHANT ONLY)
--------------------------------------------------------- */
router.post("/add", protect, async (req, res) => {
  try {
    if (req.user.role !== "merchant") {
      return res.status(403).json({ message: "Access forbidden" });
    }

    const { title, description, category, price, image } = req.body;

    const newService = new Service({
      merchant: req.user._id,
      title,
      description,
      category: category?.toLowerCase() || "other",
      price,
      image: image || "",
    });

    await newService.save();

    res.status(201).json({
      message: "Service added successfully",
      service: newService,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/* -------------------------------------------------------
   FETCH MY SERVICES (MERCHANT ONLY)
--------------------------------------------------------- */
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

/* -------------------------------------------------------
   UPDATE SERVICE (MERCHANT ONLY)
--------------------------------------------------------- */
router.put("/:id", protect, async (req, res) => {
  console.log("📩 Incoming UPDATE request:", req.params.id, req.body);

  try {
    if (req.user.role !== "merchant") {
      return res.status(403).json({ message: "Access forbidden" });
    }

    const updatedService = await Service.findOneAndUpdate(
      { _id: req.params.id, merchant: req.user._id }, // Merchant ownership check
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category?.toLowerCase(),
        price: Number(req.body.price),
        image: req.body.image,
      },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({
        message: "Service not found or unauthorized",
      });
    }

    res.json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("❌ UPDATE ERROR:", error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
});

/* -------------------------------------------------------
   DELETE SERVICE (MERCHANT ONLY)
--------------------------------------------------------- */
router.delete("/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "merchant") {
      return res.status(403).json({ message: "Access forbidden" });
    }

    const deletedService = await Service.findOneAndDelete({
      _id: req.params.id,
      merchant: req.user._id,
    });

    if (!deletedService) {
      return res.status(404).json({
        message: "Service not found or unauthorized",
      });
    }

    return res.json({ message: "Service deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Delete failed",
      error: err.message,
    });
  }
});

export default router;
