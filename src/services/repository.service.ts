import { exec } from 'child_process';
import path from "path";
import { Repository } from '../models/Repository';
import { Origin } from '../models/Origin';
import { getSetting } from './setting.service';
import { getProject } from './project.service';
import { IRepository, IRepositoryParam } from '../shared/types/repository.type';
import { ISetting } from '../shared/types/setting.type';
import { IOrigin } from "../shared/types/origin.type";
import { ROOT_DIR } from "../config";

export const createRepository = async (userId: string, data: Partial<IRepositoryParam>) => {
  try {
    const { project, origins } = data;

    const setting: ISetting = await getSetting(userId);
    const includedProject = await getProject(project as unknown as string);
    const projectPathName = includedProject?.name || 'others';

    const repoOrigins = [];
    for (const origin of origins) {
      const newOrigin: IOrigin = await Origin.create(origin);
      repoOrigins.push(newOrigin._id);
    }

    data.origins = repoOrigins;

    const repo = await Repository.create(data);

    if (includedProject) {
      if (includedProject.repositories && includedProject.repositories.length) {
        includedProject.repositories.push(repo._id);
      } else {
        includedProject.repositories = [repo._id];
      }
      await includedProject.save();
    }

    const dir = path.join(ROOT_DIR + `${setting.rootPath}`);

    let cloneResult: boolean;
    if (origins) {
      const mainOrigin = origins[0] as unknown as IOrigin;
      const command = `cd ${dir}/${projectPathName} && git clone ${mainOrigin.url}`;
      cloneResult = await new Promise((resolve) => {
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
    }

    return { repository:repo, cloneResult };
  } catch (e) {
    throw Error(e);
  }
};

export const updateRepository = async (id: string, data: Partial<IRepositoryParam>) => {
  try {
    const exist = await Repository.findOne({ _id: id });

    if (!exist) {
      throw Error("Repository does not exist");
    }

    const repoOrigins = [];
    for (const origin of data?.origins) {
      if (origin && (origin as unknown as IOrigin).id) {
        const existOrigin: IOrigin = await Origin.findOneAndUpdate({ _id: origin.id }, origin);
        repoOrigins.push(existOrigin._id);
      } else {
        const newOrigin: IOrigin = await Origin.create(origin);
        repoOrigins.push(newOrigin._id);
      }
    }

    data.origins = repoOrigins;

    return await Repository.findOneAndUpdate({ _id: id }, data as unknown as IRepository);
  } catch (e) {
    throw Error(e);
  }
}

export const getRepository = async (id: string) => {
  try {
    return await Repository.findOne({ _id: id }).populate(['project', 'origins']);
  } catch (e) {
    throw Error(e);
  }
};

export const getRepositories = async (query: any = {}, projection: any = null, options: any = {}) => {
  try {
    const total = await Repository.count(query);
    const data = await Repository.find(query, projection, options).populate(['project', 'origins']);

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

export const deleteRepository = async (id: string) => {
  try {
    return Repository.remove({ _id: id });
  } catch (e) {
    throw Error(e);
  }
};