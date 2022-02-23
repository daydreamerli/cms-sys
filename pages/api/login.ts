import { AES } from "crypto-js";
import { IResponse, LoginRequest, LoginResponse } from "../../lib/model";
import { RootPath } from "../../lib/services/api-path";
import { showMessage } from "./error-handler";
import { httpPost } from "./httpRequset";

export async function userLogin(
    {password, ...rest} : LoginRequest
): Promise<IResponse<LoginResponse>>{
    
    return httpPost<IResponse<LoginResponse>>(
        RootPath.login,{
            ...rest,
            password: AES.encrypt(password, 'cms').toString(),
          })
         // .then(showMessage(res))
   
}