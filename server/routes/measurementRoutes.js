import express from "express";
import Measurement from "../models/Measurement.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Exercise API is working!" });
});

// POST: Add a new measurement
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { chest, stomachNavel, leftArm, rightArm, leftLeg, rightLeg } = req.body;
  
  if (![chest, stomachNavel, leftArm, rightArm, leftLeg, rightLeg].every(val => Number.isInteger(val))) {
    return res.status(400).json({ message: 'All measurements must be valid integers' });
  }
  
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const user = await User.findById(userObjectId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newMeasurement = new Measurement({
      userId: userObjectId,
      chest,
      stomachNavel,
      leftArm,
      rightArm,
      leftLeg,
      rightLeg
    });

    await newMeasurement.save();
    
    res.status(201).json({ message: 'Measurement saved successfully', measurement: newMeasurement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Get all measurements for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const measurements = await Measurement.find({ userId });

    res.json(measurements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update a specific measurement
router.put('/:userId/:measurementId', async (req, res) => {
  try {
    const { userId, measurementId } = req.params;
    const { chest, stomachNavel, leftArm, rightArm, leftLeg, rightLeg } = req.body;

    const measurement = await Measurement.findOneAndUpdate(
      { _id: measurementId, userId },
      { chest, stomachNavel, leftArm, rightArm, leftLeg, rightLeg },
      { new: true }
    );

    if (!measurement) return res.status(404).json({ message: 'Measurement not found' });

    res.status(200).json({ message: 'Measurement updated', measurement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Delete a specific measurement
router.delete('/:userId/:measurementId', async (req, res) => {
  try {
    const { userId, measurementId } = req.params;

    const measurement = await Measurement.findOneAndDelete({ _id: measurementId, userId });
    if (!measurement) return res.status(404).json({ message: 'Measurement not found' });

    res.status(200).json({ message: 'Measurement deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;