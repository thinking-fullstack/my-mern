import { Response } from 'express';
import { IRequest } from "../shared/types";
import * as Service from './../services/project.service';
import { queryParser } from "../shared/utils/queryParser";

export const createProject = async (req: IRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const project = await Service.createProject(userId, req.body);
    return res.status(200).json({ success: true, msg: 'Project successfully created', data: project });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}

export const updateProject = async (req: IRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const project = await Service.updateProject(userId, id, req.body);
    return res.status(200).json({ success: true, msg: 'Project successfully updated', data: project });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}

export const getProject = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Service.getProject(id);
    return res.status(200).json({ success: true, data: project });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}

export const removeProject = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Service.deleteProject(id);
    return res.status(200).json({ success: true, msg: 'Project successfully removed' });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}

export const fetchProjects = async (req: IRequest, res: Response) => {
  try {
    const { query, projection, options } = queryParser(req.query);
    const { pagination, data } = await Service.getProjects(query, projection, options);
    return res.status(200).json({ success: true, data, pagination });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}