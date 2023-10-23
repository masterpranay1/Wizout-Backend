import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    primary_email: {
      type: String,
      required: true,
      unique: true,
    },
    secondary_email: {
      type: String,
      required: true,
    },
    p_number: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("authModel", authSchema);
