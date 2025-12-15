const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Clerk user.id

    name: { type: String },
    email: { type: String, required: true },

    age: { type: Number, default: null },
    weight: { type: Number, default: null },
    height: { type: Number, default: null },

    gender: { type: String, enum: ["Male", "Female", "Other"], default: null },

    goal: { type: String, default: "" }, // fitness/health goal
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
