import mongoose from 'mongoose';
import {ISetting} from "../shared/types/setting.type";

const { Schema } = mongoose;

/**
 * User schema
 */
const setting = new Schema({
  rootPath: {
    type: String,
    default: '/var/www/html',
  },
  sshConfigPath: {
    type: String,
    default: '~/.ssh/config'
  },
  interval: Number,
  isSyncing: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
},
{
  toJSON: { virtuals: true },
  timestamps: true,
});

export const Setting = mongoose.model<ISetting>("Setting", setting);
