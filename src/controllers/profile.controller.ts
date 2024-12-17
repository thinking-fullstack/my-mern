import { IRequest } from '../shared/types';
import * as Service from './../services/profile.service';
import { Response } from 'express';
import { queryParser } from "../shared/utils/queryParser";

export const createProfile = async (req: IRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { profile, sshKeyResult } = await Service.createProfile(userId, req.body);
    return res.status(200).json({
      success: sshKeyResult,
      msg: sshKeyResult ? 'Profile successfully created' : 'Profile is created but ssh key generation is failed.',
      data: profile,
    });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
};

export const updateProfile = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await Service.updateProfile(id, req.body);
    return res.status(200).json({
      success: true,
      msg: 'Profile successfully updated',
      data: profile,
    });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
};

export const getProfile = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await Service.getProfile(id);
    return res.status(200).json({ success: true, data: profile });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
};

export const getProfilePublicKey = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;
    const key = await Service.getProfileKey(id);
    return res.status(200).json({ success: true, data: key });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
};

export const removeProfile = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Service.deleteProfile(id);
    return res.status(200).json({ success: true, msg: 'Profile successfully removed' });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
};

export const fetchProfiles = async (req: IRequest, res: Response) => {
  try {
    let { query, projection, options } = queryParser(req.query);

    const { data, pagination } = await Service.getProfiles(query, projection, options);

    return res.status(200).json({ success: true, data, pagination });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
};
