import mongoose from 'mongoose';
import { IOrigin } from '../shared/types/origin.type';

const { Schema } = mongoose;

/**
 * User schema
 */
const origin = new Schema({
  name: String,
  url: String,
  repository: {
    type: Schema.Types.ObjectId,
    ref: "Repository",
  }
},
{
  toJSON: { virtuals: true },
  timestamps: true,
});

export const Origin = mongoose.model<IOrigin>("Origin", origin);
