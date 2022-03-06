import { Role } from '../constant/role';
import { LoginResponse } from '../model/login';

export type UserInfo = LoginResponse;

export class Storage {
  private key = 'cms-user';

  setUserInfo(data: UserInfo): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  };

  get userInfo(): UserInfo {
    try {
      return JSON.parse(localStorage.getItem(this.key) as string) as UserInfo;
    } catch (error) {
      return { token: '', role: Role.student, userId: NaN }; // 还是返回null
    }
  }

  get token(): string | null {
    return this.userInfo?.token;
  }

  get role(): Role {
    return this.userInfo?.role;
  }

  get userId(): number {
    return +this.userInfo?.userId;
  }

  deleteUserInfo(): void {
    localStorage.removeItem(this.key);
  }

}

export const storage = new Storage();

export default storage;