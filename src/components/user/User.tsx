import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import { generateAvatar } from '@/lib/utils/avatarGenerator';
import { MemberInfoType } from './UserList';

interface IUserProps {
  user: MemberInfoType;
  onOpen: (member: MemberInfoType) => void;
}
const User = ({ user, onOpen }: IUserProps) => {
  return (
    <Stack
      key={user.MONA_CD}
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
      }}
      gap="15px"
      onClick={() => {
        onOpen(user);
      }}
    >
      <Stack flexDirection="row" gap="15px" alignItems="center">
        <Avatar {...generateAvatar(user.HG_NM || '', { width: '30px', height: '30px' })} />
        <Stack>
          <Typography>{`${user.HG_NM} ${user.JOB_RES_NM}`}</Typography>
          <Typography variant="caption">{`${user.HG_NM} ${user.JOB_RES_NM}`}</Typography>
        </Stack>
      </Stack>

      <Box>
        <Chip label={user.POLY_NM} />
      </Box>
    </Stack>
  );
};

export default User;
