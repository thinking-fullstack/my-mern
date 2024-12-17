import { Document, Types } from "mongoose";

export interface ISetting extends Document {
  setting: Document<any, any, any>;
  rootPath: string;
  sshConfigPath: string;
  interval: number;
  isSyncing: boolean;
  user: Types.ObjectId;
}

export interface ISettingParam {
  rootPath: string;
  sshConfigPath: string;
  interval: number;
  isSyncing: boolean;
  user: string;
}