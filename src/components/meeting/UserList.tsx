import { Avatar, Box, Chip, Dialog, DialogTitle, Divider, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import useWebSocket from '@/lib/hooks/useWebSocket';
import useQueryString from '@/lib/hooks/useQueryString';
import useInput from '@/lib/hooks/useInput';
import { generateAvatar } from '@/lib/utils/avatarGenerator';
import useGetMemberInfoInfiniteQuery from '@/lib/queries/useGetMemberInfoInfiniteQuery';
import useIntersectionObserver from '@/lib/hooks/useIntersectionObserver';
import useBoolean from '@/lib/hooks/useBoolean';
import useDialog from '@/lib/hooks/useDialog';
import { GetMemberInfoResponseType } from '@/lib/apis/assembly';
import Loading from '../common/Loading';

type MemberInfoType = GetMemberInfoResponseType[string][1]['row'][number];

const UserList = () => {
  const [temp, onChangeTemp] = useInput('');
  const [open, onOpen, onClose] = useDialog();
  const [selectedMember, setSelectedMember] = useState<MemberInfoType | null>(null);

  const handleOpenDialog = (member: MemberInfoType) => {
    onOpen();
    setSelectedMember(member);
  };

  const handleCloseDialog = () => {
    onClose();
    setSelectedMember(null);
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetMemberInfoInfiniteQuery(temp);
  const { observerRef } = useIntersectionObserver({ hasNextPage, fetchNextPage, threshold: 0.8 });

  return (
    <>
      <Stack flex={0.2} justifyContent="center" alignItems="center" sx={{ backgroundColor: '#ECF0FE' }}>
        <Stack sx={{ overflowY: 'auto', width: '100%' }}>
          {data?.pages.map(({ rows }, pageIndex) =>
            rows.map((row, rowIndex) => (
              <Stack
                key={row.MONA_CD}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  height: '60px',
                  width: '100%',
                  p: '15px 15px',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#FFF',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
                  },
                  boderBottom:
                    pageIndex !== data.pages.length - 1 || rowIndex !== rows.length - 1
                      ? '1px solid red'
                      : '1px solid red',
                }}
                gap="15px"
                onClick={() => {
                  handleOpenDialog(row);
                }}
              >
                <Stack flexDirection="row" gap="15px" alignItems="center">
                  <Avatar {...generateAvatar(row.HG_NM || '', { width: '30px', height: '30px' })} />
                  <Stack>
                    <Typography>{`${row.HG_NM} ${row.JOB_RES_NM}`}</Typography>
                    <Typography variant="caption">{`${row.HG_NM} ${row.JOB_RES_NM}`}</Typography>
                  </Stack>
                </Stack>

                <Box>
                  <Chip label={row.POLY_NM} />
                </Box>
              </Stack>
            )),
          )}

          {isFetchingNextPage && <Loading />}
          <div ref={observerRef} style={{ minHeight: '10px' }} />
        </Stack>
      </Stack>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Set backup account</DialogTitle>
      </Dialog>
    </>
  );
};

export default UserList;

/* <textarea className="temp" value={temp} onChange={onChangeTemp} placeholder="temp" />
      <button
        type="button"
        onClick={() => {
          sendMessage(username, temp);
        }}
      >
        Temp
      </button> */
