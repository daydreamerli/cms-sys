import { AES } from "crypto-js";
import { IResponse, LoginRequest, LoginResponse, QueryParams, StudentsRequest, StudentsResponse } from "../../lib/model";
import { RootPath } from "../../lib/services/api-path";
import { httpGet, httpPost } from "./httpRequset";

export async function userLogin(
    {password, ...rest} : LoginRequest
): Promise<IResponse<LoginResponse>>{
    
    return httpPost<IResponse<LoginResponse>>(
        RootPath.login,{
            ...rest,
            password: AES.encrypt(password, 'cms').toString(),
          })
   
}

export async function getStudentList(
    req?:StudentsRequest
 ): Promise<IResponse<StudentsResponse>> {
     return httpGet<IResponse<StudentsResponse>>(
       RootPath.students,
       (req as unknown) as QueryParams
     );
 }