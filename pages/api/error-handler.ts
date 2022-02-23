import { AxiosError } from 'axios';
import { IResponse } from '../../lib/model';
import { message } from 'antd';
import { useState } from 'react';



export function errorHandler(err: AxiosError<IResponse>){

    const msg = err.response?.data.msg ?? 'unknown error';
    const code = err.response?.status ?? -1;

    if (!err.response) {
      console.error('%c [ err ]-149', 'font-size:13px; background:pink; color:#bf2c9f;', err);
    }

    return { msg, code };
}

export function showMessage(res: IResponse): IResponse{
  const [isSuccessDisplay , setIsSuccessDisplay ] = useState(false)
  const { code, msg } = res;
  const isError = !(code.toString().startsWith('2') || code.toString().startsWith('3'))

  if (isSuccessDisplay && isError) {
    message.error(msg);
  }

  if (!isError) {
    setIsSuccessDisplay(true);
    message.success(msg);
  }

  return res;
};