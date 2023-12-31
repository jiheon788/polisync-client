import { useInfiniteQuery } from '@tanstack/react-query';
import { BILL_INFO_API_URL } from '@/constants/apiUrls';
import { getBillInfo } from '../apis/assembly';
import { removeFirstSlash } from '../utils/stringHelper';

const useGetBillInfoInfiniteQuery = (billName: string, page = 1) => {
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [BILL_INFO_API_URL, billName],
    queryFn: () =>
      getBillInfo(billName, page).then((res) => {
        const rawData = Object.assign({}, ...res.data[removeFirstSlash(BILL_INFO_API_URL)]);
        const { head, row: rows } = rawData;

        return {
          head: Object.assign({}, ...head),
          rows,
        };
      }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage;
    },
    enabled: !!billName,
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export default useGetBillInfoInfiniteQuery;
