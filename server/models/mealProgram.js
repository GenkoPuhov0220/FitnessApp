import mongoose from "mongoose";

const mealProgramSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference to your user collection
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,   
        required: true
    },
    createdAt: {
    type: Date,
    default: Date.now
   }
});

export default mongoose.model("MealProgram", mealProgramSchema);