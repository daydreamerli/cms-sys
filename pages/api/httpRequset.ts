import { QueryParams } from "../../lib/model";
import axios from "axios";
import storage from "../../lib/services/storage";
import { errorHandler } from "./error-handler";

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

type IPath = (string | number)[] | string | number;

function getPath(path: IPath): string {
    return !Array.isArray(path) ? String(path) : path.join('/');
}
export async function httpPost<T>(path: IPath, params: object): Promise<T> {
    return axiosInstance
        .post(getPath(path), params)
        .then((res) => res.data)
        .catch(errorHandler);
}

export async function httpGet<T>(path: IPath, params?: QueryParams): Promise<T> {
    path = getPath(path) as string;
    path = !!params
        ? `${path}?${Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')}`
        : path;

    return axiosInstance
        .get(path)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function httpPut<T>(path: IPath, params: object): Promise<T> {
    return axiosInstance
        .put(getPath(path), params)
        .then((res) => res.data)
        .catch(errorHandler);
}

export async function httpDelete<T>(path: IPath): Promise<T> {
    return axiosInstance
        .delete(getPath(path))
        .then((res) => res.data)
        .catch(errorHandler);
}