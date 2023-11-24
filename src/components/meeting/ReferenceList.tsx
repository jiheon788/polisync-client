import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import useIntersectionObserver from '@/lib/hooks/useIntersectionObserver';
import useGetBillInfoInfiniteQuery from '@/lib/queries/useGetBillInfoInfiniteQuery';
import { containsKeyword, findWordBeforeKeyword } from '@/lib/utils/stringHelper';
import useMessagesState from '@/lib/states/messages/useMessagesState';
import Loading from '../common/Loading';
import ReferenceCard from './ReferenceCard';

const ReferenceList = () => {
  const [keyword, setKeyword] = useState('');
  const { messages } = useMessagesState();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetBillInfoInfiniteQuery(keyword);
  const { observerRef } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]?.message;

    if (containsKeyword(lastMessage)) {
      setKeyword(findWordBeforeKeyword(lastMessage));
    }
  }, [messages]);

  return (
    <Stack flex={0.4} sx={{ backgroundColor: '#F9FAFA', overflowY: 'scroll' }}>
      <Stack gap="5px">
        {data?.pages.map(({ rows }) => rows.map((row) => <ReferenceCard key={row.BILL_ID} row={row} />))}
      </Stack>
      {isFetchingNextPage && <Loading />}
      <div ref={observerRef}></div>
    </Stack>
  );
};

export default ReferenceList;
