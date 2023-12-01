import { Stack } from '@mui/material';
import React, { useState } from 'react';
import useInput from '@/lib/hooks/useInput';
import useGetMemberInfoInfiniteQuery from '@/lib/queries/useGetMemberInfoInfiniteQuery';
import useIntersectionObserver from '@/lib/hooks/useIntersectionObserver';
import useDialog from '@/lib/hooks/useDialog';
import { GetMemberInfoResponseType } from '@/lib/apis/assembly';
import Loading from '../common/Loading';
import UserDialog from './UserDialog';
import User from './User';

export type MemberInfoType = GetMemberInfoResponseType[string][1]['row'][number];

const UserList = () => {
  const [temp, onChangeTemp] = useInput('');
  const [open, onOpen, onClose] = useDialog();
  const [selectedMember, setSelectedMember] = useState<MemberInfoType | null>(null);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetMemberInfoInfiniteQuery(temp);
  const { observerRef } = useIntersectionObserver({ hasNextPage, fetchNextPage, threshold: 0.8 });

  const handleOpenDialog = (member: MemberInfoType) => {
    onOpen();
    setSelectedMember(member);
  };

  const handleCloseDialog = () => {
    onClose();
    setSelectedMember(null);
  };

  return (
    <>
      <Stack flex={0.2} justifyContent="center" alignItems="center" sx={{ backgroundColor: '#ECF0FE' }}>
        <Stack sx={{ overflowY: 'auto', width: '100%' }}>
          {data?.pages.map(({ rows }, pageIndex) =>
            rows.map((row, rowIndex) => <User key={row.MONA_CD} user={row} onOpen={handleOpenDialog} />),
          )}

          {isFetchingNextPage && <Loading />}
          <div ref={observerRef} style={{ minHeight: '10px' }} />
        </Stack>
      </Stack>
      <UserDialog open={open} onClose={handleCloseDialog} user={selectedMember} />
    </>
  );
};

export default UserList;
