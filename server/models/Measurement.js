import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to your user collection
    required: true
  },
  chest:{
    type: Number,
    required: true
  },
  stomachNavel:{
    type: Number,
    required: true
  },
  leftArm: {
    type: Number,
    required: true
  },
  rightArm: {
    type: Number,
    required: true
  },
  leftLeg: {
    type: Number,
    required: true
  },
  rightLeg: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Measurement", measurementSchema);