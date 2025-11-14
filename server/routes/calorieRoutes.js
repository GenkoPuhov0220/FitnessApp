import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Calorie from '../models/Calorie.js';

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Calorie API is working!" });
});

function calculateDailyCalorieIntake({gender, age, height, weight, activityLevel, goal}) {
    let bmr;
    gender = gender.toLowerCase();
    activityLevel = activityLevel.toLowerCase();
    goal = goal.toLowerCase();

    if (gender === 'male') {
        bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
        bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    };
    const activityMultipliers = {
        sedentary: 1.2,
        'lightly active': 1.375,
        'moderately active': 1.55,
        'very active': 1.725,
        'extra active': 1.9
    };
    let dailyCalories = bmr * (activityMultipliers[activityLevel] || 1.2);

    if (goal === 'lose weight') {
        dailyCalories -= 500;
    } else if (goal === 'gain weight') {
        dailyCalories += 500;
    };

    return Math.round(dailyCalories);
}

router.post("/", async (req, res) => {
    try {
        const { username, age, gender, height, weight, activityLevel, goal } = req.body;

        const user = await User.findOne({ username });
        if (!user){
            return res.status(404).json({ error: "User not found" });
        }

        const dailyCalorieIntake = calculateDailyCalorieIntake({
             gender,
             age: Number(age),
             height: Number(height),
             weight: Number(weight),
             activityLevel,
             goal 
        });

        const calorieEntry = new Calorie({
            userId: user._id,
            age: Number(age),
            gender,
            height: Number(height),
            weight: Number(weight),
            activityLevel,
            goal,
            dailyCalorieIntake
        });

        await calorieEntry.save();
        res.status(201).json({
            message: "Calorie intake calculated and saved successfully",
            dailyCalorieIntake
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while calculating calorie intake." });
    }
});


router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const entries = await Calorie.find({ userId: user._id });

        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedEntry = await Calorie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEntry) {
            return res.status(404).json({ error: "Calorie entry not found" });
        }
        res.status(200).json({
            message: "Calorie entry updated successfully",
            updatedEntry
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating calorie entry." });
    }   
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedEntry = await Calorie.findByIdAndDelete(req.params.id);
        if (!deletedEntry) {
            return res.status(404).json({ error: "Calorie entry not found" });
        }
        res.status(200).json({ message: "Calorie entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting calorie entry." });
    }
});

export default router;