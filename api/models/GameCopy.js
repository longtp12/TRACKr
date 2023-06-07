import mongoose from "mongoose";

const GameCopySchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  storeName: { type: String, required: true },
  retailPrice: [
    {
      price: { type: Number, required: true },
      timeStamp: { type: Date, default: Date.now },
    },
  ],
  originalPrice: { type: Number },
  link: { type: String, required: true },
});

export default mongoose.model("GameCopy", GameCopySchema);
