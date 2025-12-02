import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to your user collection
    required: true
  },
  name: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  series:{
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Exercise", exerciseSchema);
