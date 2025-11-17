import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* -------------------------
   ADD ITEM TO CART
-------------------------- */
router.post("/add", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    let cart = await Cart.findOne({ user: userId });

    // If no cart exists, create new one
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ service: serviceId, quantity: 1 }],
      });
      await cart.save();
      return res.json({ message: "Added to cart", cart });
    }

    // Check if service already exists in cart
    const existing = cart.items.find(
      (item) => item.service.toString() === serviceId
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.items.push({ service: serviceId, quantity: 1 });
    }

    await cart.save();
    res.json({ message: "Added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
});

/* -------------------------
   GET USER CART
-------------------------- */
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.service");

    res.json(cart || { items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
});

/* -------------------------
   REMOVE ITEM
-------------------------- */
router.delete("/remove/:serviceId", protect, async (req, res) => {
  try {
    const serviceId = req.params.serviceId;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    cart.items = cart.items.filter(
      (item) => item.service.toString() !== serviceId
    );

    await cart.save();
    res.json({ message: "Item removed", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Remove failed", error: err.message });
  }
});

export default router;
