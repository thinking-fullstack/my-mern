import { Document, Types } from "mongoose";
import { IProject} from "./project.type";

export interface IProfile extends Document {
  name: string;
  email: string;
  projects: Types.ObjectId[];
  profile: string;
  status: boolean;
}

export interface IProfileParam {
  name: string;
  email: string;
  projects: string[];
  profile: string;
  status: boolean;
}