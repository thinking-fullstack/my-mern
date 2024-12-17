import { Document, Types } from 'mongoose';
import { IOriginParam } from './origin.type';

export interface IRepository extends Document {
  name: string;
  project: Types.ObjectId;
  origins: Types.ObjectId[];
  branches: string[];
}

export interface IRepositoryParam {
  name: string;
  project: string;
  origins: Partial<IOriginParam>[];
  branches: string[];
}