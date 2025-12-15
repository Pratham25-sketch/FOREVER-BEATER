const Reading = require("../models/readings");

// ADD READING (with userId)
exports.addReading = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const reading = await Reading.create(req.body);

    res.status(201).json(reading);
  } catch (err) {
    next(err);
  }
};

// GET ALL READINGS (only for this user)
exports.getAllReadings = async (req, res, next) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const readings = await Reading.find({ userId }).sort({ createdAt: -1 });

    res.json(readings);
  } catch (err) {
    next(err);
  }
};

// GET ONE READING
exports.getReading = async (req, res, next) => {
  try {
    const reading = await Reading.findOne({
      _id: req.params.id,
      userId: req.query.userId,
    });

    if (!reading) {
      return res.status(404).json({ error: "Reading not found" });
    }

    res.json(reading);
  } catch (err) {
    next(err);
  }
};

// UPDATE READING
exports.updateReading = async (req, res, next) => {
  try {
    const reading = await Reading.findOneAndUpdate(
      { _id: req.params.id, userId: req.body.userId },
      req.body,
      { new: true }
    );

    if (!reading) {
      return res.status(404).json({ error: "Reading not found" });
    }

    res.json(reading);
  } catch (err) {
    next(err);
  }
};

// DELETE READING
exports.deleteReading = async (req, res, next) => {
  try {
    const reading = await Reading.findOneAndDelete({
      _id: req.params.id,
      userId: req.query.userId,
    });

    if (!reading) {
      return res.status(404).json({ error: "Reading not found" });
    }

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
