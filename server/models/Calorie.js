import mongoose from "mongoose";  

const calorieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference to your user collection
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    activityLevel: {
        type: String,
        enum: ['sedentary', 'lightly active', 'moderately active', 'very active', 'extra active'],
        required: true
    },
    goal: {
        type: String,
        enum: ['lose weight', 'maintain weight', 'gain weight'],
        required: true
    },
    dailyCalorieIntake: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Calorie", calorieSchema);
        