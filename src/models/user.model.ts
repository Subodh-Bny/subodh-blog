import mongoose, { Schema, Document } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
