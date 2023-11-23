import { useInfiniteQuery } from '@tanstack/react-query';
import { BILL_INFO_API_URL } from '@/constants/apiUrls';
import { getBillInfo } from '../apis/assembly';

const useGetBillInfoInfiniteQuery = (pIndex = 1, billName: string) => {
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [BILL_INFO_API_URL, billName],
    queryFn: () => getBillInfo(pIndex, billName),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });

  return { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export default useGetBillInfoInfiniteQuery;
