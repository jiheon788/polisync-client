import { Avatar, Box, Stack, Typography } from '@mui/material';
import { IMessage } from '@/lib/states/messages/atoms';
import { generateAvatar } from '@/lib/utils/avatarGenerator';

interface IMessgeProps extends IMessage {
  isMine: boolean;
  message: string;
  name: string;
}
const Message = ({ isMine, message, name }: IMessgeProps) => {
  return (
    <Stack
      flexDirection="row"
      gap="10px"
      sx={{
        p: '12px 10px',
        alignSelf: isMine ? 'flex-end' : 'flex-start',
      }}
    >
      {!isMine && <Avatar {...generateAvatar(name)} />}
      <Box
        sx={{
          background: isMine ? 'linear-gradient(25deg, #001295, #283FD0)' : '#F9FAFA',
          p: '12px 12px',
          borderRadius: isMine ? '15px 15px 0 15px' : '15px 15px 15px 0',
          color: isMine ? '#FFF' : '#333',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {!isMine && <Typography variant="subtitle2">{name} :</Typography>}
        {message}
      </Box>
    </Stack>
  );
};

export default Message;
