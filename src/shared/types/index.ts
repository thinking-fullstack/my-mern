import { Request } from 'express';

export interface IRequest extends Request {
  user: { id: string, name: string, email: string }
}
