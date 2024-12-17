import mongoose from 'mongoose';
import { IProfile } from "../shared/types/profile.type";

const { Schema } = mongoose;

/**
 * User schema
 */
const profile = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Please add an email"],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
    unique: true
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: "Project",
  }]
},
{
  toJSON: { virtuals: true },
  timestamps: true,
});

export const Profile = mongoose.model<IProfile>("Profile", profile);
