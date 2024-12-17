import { exec } from "child_process";
import os from "os";
import fs from "fs";
import SSHConfig from 'ssh-config';
import { Profile } from '../models/Profile';
import { IProfile, IProfileParam } from '../shared/types/profile.type';
import { Hosts } from "../shared/constants/global";

const getSshFileName = (name: string) => name.replace(/\s/g, '').toLowerCase();

const generateSshKey = async (name: string) => {
  const fileName = getSshFileName(name);
  const homeDir = os.userInfo().homedir;

  const command = `C: && cd ${homeDir}/.ssh && ssh-keygen -f "id_rsa_${fileName}" -N ""`;
  // const command = `cd ~/.ssh/ && ssh-keygen -f "id_${name}" -N ""`;

  return await new Promise((resolve) => {
    exec(command, (err, stdout) => {
      if (err) {
        console.log(err);
        resolve(false);
        return;
      }
      console.log(stdout);
      resolve(true);
    });
  });
};

export const createProfile = async (userId: string, data: Partial<IProfileParam>) => {
  try {
    const sshKeyResult = await generateSshKey(data.name);
    const profile = await Profile.create(data);
    return { profile, sshKeyResult };
  } catch (e) {
    throw Error(e);
  }
};

export const updateProfile = async (id: string, data: Partial<IProfileParam>) => {
  try {
    const exist = await Profile.findOne({ _id: id });

    if (!exist) {
      throw Error('Profile does not exist');
    }

    return await Profile.findOneAndUpdate({ _id: id }, data as unknown as IProfile);
  } catch (e) {
    throw Error(e);
  }
};

export const getProfile = async (id: string) => {
  try {
    return await Profile.findOne({ _id: id });
  } catch (e) {
    throw Error(e);
  }
};

export const getProfileKey = async (id: string) => {
  try {
    const profile = await Profile.findOne({ _id: id })
    const fileName = getSshFileName(profile.name);
    const homeDir = os.userInfo().homedir;
    return fs.readFileSync(`${homeDir}/.ssh/id_rsa_${fileName}.pub`, { encoding: 'utf8' });
  } catch (e) {
    throw Error(e);
  }
};

export const getProfiles = async (query = {}, projection = null, options: { limit?: number, skip?: number } = {}) => {
  try {
    const total = await Profile.count(query);
    const data = await Profile.find(query, projection, options).populate('projects');

    let pageLimit;
    let pageNumber;
    if (options) {
      if (options.limit) {
        pageLimit = options.limit;
        if (options.skip) {
          pageNumber = options.skip / options.limit;
        }
      }
    }

    return {
      pagination: {
        total,
        pageLimit,
        pageNumber,
      },
      data,
    }
  } catch (e) {
    throw Error(e);
  }
};

export const deleteProfile = async (id: string) => {
  try {
    const exist = await Profile.findOne({ _id: id });
    const homeDir = os.userInfo().homedir;
    const fileName = getSshFileName(exist.name);
    const path = `${homeDir}/.ssh/id_rsa_${fileName}`;

    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    if (fs.existsSync(`${path}.pub`)) {
      fs.unlinkSync(`${path}.pub`);
    }

    const configText = fs.readFileSync(`${homeDir}/.ssh/config`, { encoding: 'utf8' });
    const sshConfig = SSHConfig.parse(configText);
    Hosts.forEach((host) => {
      sshConfig
      .remove(line => {
        if (line.param === 'Host') {
          return line.value === `${fileName.toLowerCase()}.${host.host}`;
        }
        return false;
      });
    });

    fs.writeFileSync(`${homeDir}/.ssh/config`, SSHConfig.stringify(sshConfig), { encoding: 'utf8' });

    // const command = `cd ~/.ssh/ && ssh-keygen -f "id_${name}" -N ""`;
    return Profile.findByIdAndDelete(id);
  } catch (e) {
    throw Error(e);
  }
};
