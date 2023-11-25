import { useInfiniteQuery } from '@tanstack/react-query';
import { MEMBER_INFO_API_URL } from '@/constants/apiUrls';
import { getMemberInfo } from '../apis/assembly';
import { removeFirstSlash } from '../utils/stringHelper';

const useGetMemberInfoInfiniteQuery = (memberName: string, page = 1) => {
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [MEMBER_INFO_API_URL, memberName],
    queryFn: () =>
      getMemberInfo(memberName, page).then((res) => {
        const rawData = Object.assign({}, ...res.data[removeFirstSlash(MEMBER_INFO_API_URL)]);
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
  });

  return { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export default useGetMemberInfoInfiniteQuery;
