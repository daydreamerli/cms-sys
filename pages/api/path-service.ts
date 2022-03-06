export type IPath = (string | number)[] | string | number;

export function getPath(path: IPath): string {
    return !Array.isArray(path) ? String(path) : path.join('/');
  }