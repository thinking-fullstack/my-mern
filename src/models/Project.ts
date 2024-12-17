import mongoose from 'mongoose';
import {IProject} from "../shared/types/project.type";

const { Schema } = mongoose;

/**
 * User schema
 */
const project = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['github', 'bitbucket', 'gitlab', 'azure', 'other'],
    default: "github"
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  repositories: [{
    type: Schema.Types.ObjectId,
    ref: "Repository"
  }],
  status: Boolean,
  folderPath: String
},
{
  toJSON: { virtuals: true },
  timestamps: true,
});

export const Project = mongoose.model<IProject>("Project", project);
