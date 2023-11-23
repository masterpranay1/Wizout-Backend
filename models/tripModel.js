import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    travelers: {
      type: [mongoose.ObjectId],
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      required: true,
    },
    requests: {
      type: [mongoose.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
