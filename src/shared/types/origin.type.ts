import { Document, Types } from "mongoose";
import { IRepository } from "./repository.type";

export interface IOrigin extends Document {
  id?: Types.ObjectId;
  name: string;
  url: string;
  repository: Types.ObjectId;
}

export interface IOriginParam {
  id?: string;
  name: string;
  url: string;
  repository?: string;
}