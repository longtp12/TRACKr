import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    isAdmin: {type: Boolean}
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
