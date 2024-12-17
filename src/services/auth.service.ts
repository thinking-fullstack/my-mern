import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../models/User";
import { getUserById } from "./user.service";
import { Setting } from "../models/Setting";
import { ISetting, ISettingParam } from "../shared/types/setting.type";

export const login =  async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (user && (await compare(password, user.password))) {
      const accessToken = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '3h' },
      );

      return { accessToken, user }
    } else {
      throw Error('Invalid credential');
    }
  } catch (e) {
    throw Error('Invalid credential');
  }
}

export const register = async (user: Partial<any>) => {
  try {
    const exist = await User.findOne({
      email: user.email
    }).exec();

    if (!exist) {
      const salt = await genSalt(parseInt(process.env.SALT_ROUNDS));
      user.password = await hash(user.password, salt);

      const registeredUser = await User.create(user);
      const initSetting: Partial<ISettingParam> = {
        interval: 0,
        isSyncing: false,
      }
      const setting: ISetting = new Setting(initSetting);
      setting.user = registeredUser._id;
      await setting.save();

      return registeredUser;
    } else {
      throw Error('Email already exist.');
    }
  } catch (e) {
    throw Error('Failed to register');
  }
}

export const getMe = async (id: string) => {
  try {
    const exist = await getUserById(id);

    if (exist) {
      return exist;
    } else {
      throw Error('User not exist.');
    }
  } catch {
    throw Error('Failed to register');
  }
}

export const resetUserPassword = async (user, password) => {
  try {
    const exist = await User.findById(user.id);
    if (!exist) {
      throw Error('User not exist.');
    }

    const salt = await genSalt(parseInt(process.env.SALT_ROUNDS));
    exist.password = await hash(password, salt);
    await exist.save();
  } catch (e) {
    throw Error(e);
  }
}