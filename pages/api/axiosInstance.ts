
import axios from "axios";
import storage from "../../lib/services/storage";

const baseURL = 'http://cms.chtoma.com/api';

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  responseType: 'json',
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.url.includes('login')) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: 'Bearer ' + storage?.token,
      },
    };
  }

  return config;
});

export type IPath = (string | number)[] | string | number;

export function getPath(path: IPath): string {
    return !Array.isArray(path) ? String(path) : path.join('/');
  }