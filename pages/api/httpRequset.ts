import { QueryParams } from "../../lib/model";
import { axiosInstance, getPath, IPath } from "./axiosInstance";
import { errorHandler } from "./error-handler";


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