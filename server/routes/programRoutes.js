import express from "express";
import User from "../models/User.js";
import Program from "../models/program.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Program API is working!" });
});

// Save a new program
router.post('/', async (req, res) => {
  try {
    const { username, title, description } = req.body;
    if (!username || !title || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newProgram = new Program({
        userId: user._id,
        title,
        description
    });
    await newProgram.save();
    res.status(201).json({ message: 'Program saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all programs for a user
router.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const programs = await Program.find({ userId: user._id });
    res.json(programs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a program
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true } // Връща обновения документ
    );

    if (!updatedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json({ message: "Program updated successfully", program: updatedProgram });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete one program
router.delete('/:id', async (req, res) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.json({ message: 'Program deleted successfully' });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;