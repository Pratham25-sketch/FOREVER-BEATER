const express = require("express");
const router = express.Router();

const {
  registerOrGetUser,
  updateUser,
} = require("../controllers/usersController");

// Register or fetch existing user
router.post("/register", registerOrGetUser);

// Update profile
router.put("/:clerkId", updateUser);

module.exports = router;

