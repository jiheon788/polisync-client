import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { BILL_INFO_API_URL } from '@/constants/apiUrls';
import { GetBillInfoResponseType, getBillInfo } from '../apis/assembly';
import { removeFirstSlash } from '../utils/stringHelper';

export class Factory<T> {
  constructor(private type: new () => T) {}

  getNew(): T {
    return new this.type();
  }
}

const useGetBillInfoInfiniteQuery = (billName: string, page = 1) => {
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [BILL_INFO_API_URL],
    queryFn: () =>
      getBillInfo(page, billName).then((res) => {
        const rawData = Object.assign({}, ...res.data[removeFirstSlash(BILL_INFO_API_URL)]);
        const { head, row: rows } = rawData;

        return {
          info: Object.assign({}, ...head),
          rows,
        };
      }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });

  return { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export default useGetBillInfoInfiniteQuery;
