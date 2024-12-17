import { Document, Types } from "mongoose";

export interface IProject extends Document {
  name: string;
  type: "github" | "bitbucket" | "gitlab" | "azure" | "other";
  repositories: Types.ObjectId[];
  profile: Types.ObjectId;
  status: boolean;
  folderPath: string;
}

export interface IProjectParam {
  name: string;
  type: "github" | "bitbucket" | "gitlab" | "azure" | "other";
  repositories: string[];
  profile: string;
  status: boolean;
  folderPath: string;
}