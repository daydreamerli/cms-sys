import { AES } from "crypto-js";
import { AddStudentRequest, AddStudentResponse, DeleteResponse, IResponse, LoginRequest, LoginResponse, QueryParams, StudentsRequest, StudentsResponse, UpdateStudentRequest, UpdateStudentResponse } from "../../lib/model";
import { RootPath } from "../../lib/services/api-path";
import { httpDelete, httpGet, httpPost, httpPut } from "./httpRequset";

export async function userLogin(
    { password, ...rest }: LoginRequest
): Promise<IResponse<LoginResponse>> {

    return httpPost<IResponse<LoginResponse>>(
        RootPath.login, {
        ...rest,
        password: AES.encrypt(password, 'cms').toString(),
    })

}

export async function userLogout(): Promise<IResponse<boolean>>{
    return httpPost<IResponse<boolean>>(RootPath.logout,{})
}

export async function getStudentList(
    req?: StudentsRequest
): Promise<IResponse<StudentsResponse>> {
    return httpGet<IResponse<StudentsResponse>>(
        RootPath.students,
        (req as unknown) as QueryParams
    );
}

export async function getStudentById(id: number): Promise<IResponse<StudentsResponse>> {
    return httpGet<IResponse<StudentsResponse>>([RootPath.students,id])
}

export async function addStudent(req:AddStudentRequest): Promise<IResponse<AddStudentResponse>> {
    return httpPost([RootPath.students],req)
}

export async function updateStudent(req: UpdateStudentRequest): Promise<IResponse<UpdateStudentResponse>> {
    return httpPut([RootPath.students],req)
}

export async function deleteStudent(id: number): Promise<IResponse<DeleteResponse>> {
    return httpDelete([RootPath.students,id])
}