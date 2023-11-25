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
  const { observerRef } = useIntersectionObserver({ hasNextPage, fetchNextPage, threshold: 0.8 });

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]?.message;

    if (containsKeyword(lastMessage)) {
      setKeyword(findWordBeforeKeyword(lastMessage));
    }
  }, [messages]);

  return (
    <Stack flex={0.4} sx={{ overflowY: 'auto', backgroundColor: '#ECF0FE' }}>
      <Stack p="15px 10px">
        {data?.pages.map(({ rows }) => rows.map((row) => <ReferenceCard key={row.BILL_ID} row={row} />))}
        {isFetchingNextPage && <Loading />}
        <div ref={observerRef} style={{ minHeight: '10px' }} />
      </Stack>
    </Stack>
  );
};

export default ReferenceList;
