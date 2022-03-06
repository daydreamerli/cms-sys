import { omitBy } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { IResponse, ProfileListResponse, Paginator, ProfileListPaginator } from '../../lib/model/api';
import { Student } from '../../lib/model/student';
/* 
@params apiFn : send api request using apiService
@param sourceKey --res.data.data.list -> array  maybe not requited  相应中的列表字段名称
@params onlyFresh -- 是否执使用当前相应结果
@params params ---apiFn parameter ---需要被处理 否则可以跟apiFn写一起
*/
export function useListEffect<P, T extends ProfileListResponse, U = any>(
  apiFn: (req: P) => Promise<IResponse<ProfileListResponse>>,
  sourceKey: keyof T,
  onlyFresh = true,
  params: Partial<ProfileListPaginator<P>> = {}
) {
  const [data, setData] = useState<Student[]>([]);
  const [paginator, setPaginator] = useState<Paginator>({ limit: 20, page: 1 });
  const [hasMore, setHasMore] = useState<boolean>(true); // total 是否大于现在的数据量 
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const request = useCallback(apiFn, []);
  const stringParams = JSON.stringify(params || {});

  useEffect(() => {
    const req = omitBy(
      { ...paginator, ...(params || {}) },
      (item: string | number | boolean | null) => item === '' || item === null
    ) as any;

    setLoading(true);

    request(req).then((res) => {
      const { data: newData } = res;
      const fresh = (newData [sourceKey as string] as unknown) as U[];
      const source = onlyFresh ? fresh : [...data, ...fresh];

      setData(source);
      setTotal(newData.total);
      setHasMore(
        onlyFresh ? !!source.length && source.length < newData.total : newData.total > source.length
      );
      setLoading(false);
    });
  }, [paginator, stringParams]);

  return {
    data,
    hasMore,
    paginator,
    total,
    loading,
    setPaginator,
    setData,
    setTotal,
    setLoading,
  };
}