import { Hosts } from '../constants/global';
export const getHostByType = (type: string) => Hosts.find((host) => host.type === type);