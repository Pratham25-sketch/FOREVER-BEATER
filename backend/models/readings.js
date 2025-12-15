const mongoose = require("mongoose");

const ReadingSchema = new mongoose.Schema(
  {
    // Link each reading to a user
    userId: {
      type: String,        // Clerk user ID is a STRING (not ObjectId)
      required: true
    },

    // Auto-format date and time
    time: {
      type: String,
      default: () =>
        new Date().toLocaleDateString() +
        " " +
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    },

    heartRate: { type: Number, required: true },
    bloodPressure: { type: String, required: true },
    stressLevel: { type: String, required: true },
    sleepHours: { type: Number, required: true },
    exerciseMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reading", ReadingSchema);

