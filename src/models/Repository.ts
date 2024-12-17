import mongoose from 'mongoose';
import {IRepository} from "../shared/types/repository.type";

const { Schema } = mongoose;

/**
 * User schema
 */
const repository = new Schema({
  name: {
    type: String,
    trim: true,
  },
  branches: [String],
  origins: [{
    type: Schema.Types.ObjectId,
    ref: "Origin",
  }],
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  }
},
{
  toJSON: { virtuals: true },
  timestamps: true,
});

export const Repository = mongoose.model<IRepository>("Repository", repository);
