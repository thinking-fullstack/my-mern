import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * User schema
 */
const user = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
    unique: true,
  },
  password: String,
},
{
  toJSON: { virtuals: true },
  timestamps: true,
});

export const User = mongoose.model("User", user);
