import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
      quantity: { type: Number, default: 1 }
    }
  ]
});

export default mongoose.model("Cart", cartSchema);
