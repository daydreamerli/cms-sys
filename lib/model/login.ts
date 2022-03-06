import { Role } from '../constant/role';

export interface LoginFormData {
  role: Role;
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  token: string;
  role: Role;
  userId: number;
}

export type LoginRequest = LoginFormData;
