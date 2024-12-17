import { Setting } from '../models/Setting';
import { getUserById } from './user.service';
import { ISetting, ISettingParam } from '../shared/types/setting.type';

export const createSetting = async (userId: string, data: Partial<ISettingParam>) => {
  try {
    const user = await getUserById(userId);

    if (!user) {
      throw Error("User does not exist");
    }

    const setting: ISetting = new Setting(data);
    setting.user = user;
    await setting.save();
    return setting;
  } catch (e) {
    throw Error(e);
  }
};

export const updateSetting = async (userId: string, data: Partial<ISettingParam>) => {
  try {
    const exist = await Setting.findOne({ user: userId });

    if (!exist) {
      throw Error("General setting does not exist");
    }

    return await Setting.findOneAndUpdate({ user: userId }, data);
  } catch (e) {
    throw Error(e);
  }
}

export const getSetting = async (userId: string) => {
  try {
    return await Setting.findOne({user: userId});
  } catch (e) {
    throw Error(e);
  }
};