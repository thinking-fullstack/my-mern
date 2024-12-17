import fs from 'fs';
import path from "path";
import SSHConfig from 'ssh-config';
import os from "os";
import { Project } from '../models/Project';
import { getSetting } from './setting.service';
import { getProfile } from './profile.service';
import { ROOT_DIR } from "../config";
import { IProject, IProjectParam } from '../shared/types/project.type';
import { ISetting } from "../shared/types/setting.type";
import { IProfile } from "../shared/types/profile.type";
import { getHostByType } from "../shared/utils/getHostByType";

const configSsh = async (rootPath: string, name: string, projectName: string, type: string) => {
  try {
    const fileName = name.replace(/\s/g, '').toLowerCase();
    const dir = path.join(ROOT_DIR + `/../${rootPath}/${projectName}`);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const homeDir = os.userInfo().homedir;

    const configText = fs.readFileSync(`${homeDir}/.ssh/config`, { encoding: 'utf8' });
    const sshConfig = SSHConfig.parse(configText);
    const host = getHostByType(type);
    if (!host) {
      return false;
    }

    const sshHost = `${fileName.toLowerCase()}.${host.host}`;
    const section = sshConfig.find({ Host: sshHost });
    if (section) {
      return true
    }

    sshConfig.append({
      Host: sshHost,
      HostName: host.host,
      User: 'git',
      IdentityFile: `~/.ssh/id_rsa_${fileName}`,
    });

    fs.writeFileSync(`${homeDir}/.ssh/config`, SSHConfig.stringify(sshConfig), { encoding: 'utf8' });
    return true;
  } catch (error) {
    return false;
  }
};

export const createProject = async (userId: string, data: Partial<IProjectParam>) => {
  try {
    const { name, type } = data;
    const exist = await Project.findOne({ name });

    if (exist) {
      throw Error('Project name already exist');
    }

    const setting: ISetting = await getSetting(userId);
    const profile: IProfile = await getProfile(data.profile);
    await configSsh(setting.rootPath, profile.name, name, type);

    const project = await Project.create(data);

    profile.projects.push(project._id);
    await profile.save();

    return project;
  } catch (e) {
    throw Error(e);
  }
};

export const updateProject = async (userId: string, id: string, data: Partial<IProjectParam>) => {
  try {
    const exist = await Project.findOne({ _id: id });

    if (!exist) {
      throw Error("Project does not exist");
    }

    const profile: IProfile = await getProfile(data.profile);
    const setting: ISetting = await getSetting(userId);
    await configSsh(setting.rootPath, profile.name || exist.name, exist.name, data.type || exist.type);
    return await Project.findOneAndUpdate({ _id: id }, data as unknown as IProject);
  } catch (e) {
    throw Error(e);
  }
}

export const getProject = async (id: string) => {
  try {
    return await Project.findOne({ _id: id }).populate('repositories', 'name');
  } catch (e) {
    throw Error(e);
  }
};

export const getProjects = async (query: any = {}, projection: any = null, options: any = {}) => {
  try {
    const total = await Project.count(query);
    const data = await Project.find(query, projection, options).populate([
      { path: 'profile', select: 'name' },
      { path: 'repositories', select: 'name' },
    ]);

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

export const deleteProject = async (id: string) => {
  try {
    return Project.remove({ _id: id });
  } catch (e) {
    throw Error(e);
  }
};