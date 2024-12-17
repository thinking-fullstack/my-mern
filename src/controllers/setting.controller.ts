import { Response } from 'express';
import { IRequest } from "../shared/types";

import * as Service from './../services/setting.service';

export const createGeneralSetting = async (req: IRequest, res: Response) => {
  try {
    const setting = await Service.createSetting(req.user.id, req.body);
    return res.status(200).json({ success: true, msg: 'Global setting created', data: setting });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}

export const updateGeneralSetting = async (req: IRequest, res: Response) => {
  try {
    const setting = await Service.updateSetting(req.user.id, req.body);
    return res.status(200).json({ success: true, msg: 'Global setting updated' });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}

export const getGeneralSetting = async (req: IRequest, res: Response) => {
  try {
    const setting = await Service.getSetting(req.user.id);
    return res.status(200).json({ success: true, data: setting });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}