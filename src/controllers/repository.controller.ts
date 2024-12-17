import { Response } from 'express';
import { IRequest } from '../shared/types';
import { queryParser } from '../shared/utils/queryParser';
import * as Service from './../services/repository.service';

export const createRepository = async (req: IRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { repository, cloneResult } = await Service.createRepository(userId, req.body);
    return res.status(200).json({
      success: cloneResult,
      msg: cloneResult ? 'Repository successfully created' : 'Failed to clone repository',
      data: repository
    });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}

export const updateRepository = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;
    const repository = await Service.updateRepository(id, req.body);
    return res.status(200).json({ success: true, msg: 'Repository successfully updated', data: repository });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}

export const getRepository = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;
    const repository = await Service.getRepository(id);
    return res.status(200).json({ success: true, data: repository });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}

export const removeRepository = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Service.deleteRepository(id);
    return res.status(200).json({ success: true, msg: 'Repository successfully removed' });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}

export const fetchRepositories = async (req: IRequest, res: Response) => {
  try {
    const { query, projection, options } = queryParser(req.query);
    const { pagination, data } = await Service.getRepositories(query, projection, options);

    return res.status(200).json({ success: true, data, pagination });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}