import { message } from 'antd';
import axios, { AxiosError } from 'axios'
import { AES } from 'crypto-js';
import header from '../../components/home/header';
import { DeleteResponse, IResponse, QueryParameters } from '../model/api';
import { LoginRequest, LoginResponse } from '../model/login';
import { RootPath } from './api-path';
import storage, { UserInfo } from '../../lib/service/storage';
import { AddStudentRequest, AddStudentResponse, ProfileRequest, Student, StudentResponse, StudentsResponse, UpdateStudentRequest, UpdateStudentResponse } from '../model/student';

const baseURL = 'http://cms.chtoma.com/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  responseType: 'json'
});

/* axiosInstance.interceptors.request.use((config) => {
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

type IPath = (string | number)[] | string | number; */


class ApiService {
  private userToken = storage.token;

  public async login({ password, ...rest }: LoginRequest): Promise<IResponse<LoginResponse> | any> {
    return await axiosInstance.post<IResponse<LoginResponse>>((`${baseURL}/login`), {
      ...rest,
      password: AES.encrypt(password, 'cms').toString()
    })
      .then(function (response) {
        const userInfo = response.data;
        console.log(userInfo);
        return userInfo;
      })
      .catch((err) => {
        this.errorHandler;
      });
  }
  // to-do other method : / logout / forget_password / register ...etc
  // // passing url 'logout' to axios what's the return? how to handle redirect to login?
  public async logout(): Promise<IResponse<boolean>> {

    return axiosInstance.post<IResponse<boolean>>
      ((`${baseURL}/logout`), {}, {
        headers: {
          'Authorization': `Bearer ${this.userToken}`
        }
      })
      .then(res => res.data); // passing url 'logout' to axios what's the return? 
  }
  // to-do: add getStudentsList
  public async getStudentsList(req: ProfileRequest): Promise<IResponse<StudentsResponse>> {
    const apiURL = `${baseURL}/students`;  // 需要开始封装路径
    let params = req as unknown as string;  // de-cap ProfileRequest as params g
    const studentsURL = !!params            // //params = {"page": 1,"limit":20} passing from paginator
      ? `${apiURL}?${Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
      : apiURL;
    console.log(studentsURL);

    return await axiosInstance.get<IResponse<StudentsResponse>>(
      (studentsURL), {
      headers: {
        'Authorization': `Bearer ${this.userToken}`
      }
    })
      .then(function (response) {
        const studentProfile = response.data;
        return studentProfile;
      })
      .then(this.showMessage());
  }

  public async getStudentById(id: number): Promise<IResponse<StudentResponse>> {
    
    return await axiosInstance.get<IResponse<StudentsResponse>>(
      (`${baseURL}/students/${id}`), {
      headers: {
        'Authorization': `Bearer ${this.userToken}`
      }
    })
      .then(function (response) {
        const studentProfile = response.data;
        console.log(studentProfile)
        return studentProfile;
      })
      .then(this.showMessage());
  }

  public async addStudent(newStudentInfo: AddStudentRequest): Promise<IResponse<AddStudentResponse>> {

    return axiosInstance.post<IResponse<AddStudentResponse>>(
      `${baseURL}/students`,
      newStudentInfo,
      {
        headers: {
          'Authorization': `Bearer ${this.userToken}`
        }
      })
      .then(res => res.data)
      .then(this.showMessage(true));
  }

  public async updateStudent(updateInfo: UpdateStudentRequest): Promise<IResponse<UpdateStudentResponse>> {

    return axiosInstance.put<IResponse<UpdateStudentResponse>>(
      `${baseURL}/students`,
      updateInfo,
      {
        headers: {
          'Authorization': `Bearer ${this.userToken}`
        }
      })
      .then(res => res.data)
      .then(this.showMessage(true));
  }

  public async deleteStudent(id: number): Promise<IResponse<DeleteResponse>> {

    return axiosInstance.delete<IResponse<DeleteResponse>>(
      `${baseURL}/students?id=${id}`,
      {
        headers: {
          'Authorization': `Bearer ${this.userToken}`
        }
      })
      .then(res => res.data)
      .then(this.showMessage(true));
  }

  protected isError(code: number): boolean {
    return !(code.toString().startsWith('2') || code.toString().startsWith('3'));
  }

  protected showMessage = (isSuccessDisplay = false) => (res: IResponse): IResponse => {
    const { code, msg } = res;
    const isError = this.isError(code);

    if (isError) {
      message.error(msg);
    }

    if (isSuccessDisplay && !isError) {
      message.success(msg);
    }

    return res;
  };

  private errorHandler(err: AxiosError<IResponse>): IResponse {
    const msg = err.response?.data.msg ?? 'unknown error';
    const code = err.response?.status ?? -1;

    if (!err.response) {
      console.error(err);
    }

    return { msg, code };
  }

}
// singleton design 单个实例 在生命周期
export const apiService = new ApiService()

export default apiService;
