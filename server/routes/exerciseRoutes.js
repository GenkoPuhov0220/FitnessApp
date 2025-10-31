import express from "express";
import Exercise from "../models/Exercise.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Exercise API is working!" });
});


// Save a new exercise
router.post('/', async (req, res) => {
  try {
    const { username, name, reps } = req.body;

    if (!username || !name || !reps) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newExercise = new Exercise({
      userId: user._id,
      name,
      reps
    });

    await newExercise.save();
    res.status(201).json({ message: 'Exercise saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all exercises for a user
router.get("/:username", async (req, res) => {
  try {
    console.log("Received request for:", req.params.username);  // Debugging
    const user = await User.findOne({ username: req.params.username });
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const exercises = await Exercise.find({ userId: user._id });
    res.json(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete one exercise
router.delete('/:id', async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete all exercises for a user
router.delete('/clear/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await Exercise.deleteMany({ userId: user._id });
    res.json({ message: 'All exercises cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
