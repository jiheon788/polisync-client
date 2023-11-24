import { useInfiniteQuery } from '@tanstack/react-query';
import { BILL_INFO_API_URL } from '@/constants/apiUrls';
import { GetBillInfoResponseType, getBillInfo } from '../apis/assembly';
import { removeFirstSlash } from '../utils/stringHelper';

const isValidResponse = (data: GetBillInfoResponseType) =>
  Object.keys(data).some((key) => key === removeFirstSlash(BILL_INFO_API_URL));

const useGetBillInfoInfiniteQuery = (billName: string, page = 1) => {
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [BILL_INFO_API_URL, billName],
    queryFn: () =>
      getBillInfo(page, billName).then((res) => {
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
  });

  return { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export default useGetBillInfoInfiniteQuery;
