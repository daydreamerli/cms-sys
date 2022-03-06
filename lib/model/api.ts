export interface IResponse<T = any> {
  code: number;
  msg: string;
  data?: T;
}

export interface QueryParameters {
  [key: string]: string | number;
}

export interface Paginator {
  page: number;
  limit: number;
  total?: number;
}

export type ProfileListPaginator<T> = Omit<T, 'page' | 'limit'>;

export interface ProfileListResponse {
  total: number;
  Paginator?: Paginator;
}

export type DeleteResponse = boolean;

export interface BaseType {
  id: number;
  name: string;
}