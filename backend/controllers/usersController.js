const User = require("../models/User");

// Create profile if not exists
exports.registerOrGetUser = async (req, res) => {
  try {
    const { clerkId, email, name } = req.body;

    if (!clerkId || !email)
      return res.status(400).json({ error: "clerkId and email are required" });

    // Check if user exists
    let user = await User.findOne({ clerkId });

    if (!user) {
      // Create new user
      user = await User.create({
        clerkId,
        email,
        name,
      });
    }

    return res.json(user);
  } catch (err) {
    console.error("User error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const { clerkId } = req.params;

    const updated = await User.findOneAndUpdate(
      { clerkId },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};
