import { Chip, Stack, alpha } from '@mui/material';

import useMessagesState from '@/lib/states/messages/useMessagesState';
import useScrollTo from '@/lib/hooks/useScrollTo';
import useQueryString from '@/lib/hooks/useQueryString';
import Message from './Message';
import Generator from './Generator';
const MessageList = () => {
  const { getParams } = useQueryString();
  const username = getParams('username');
  const { messages } = useMessagesState();
  const { targetRef } = useScrollTo(messages);

  return (
    <Stack
      flex={0.4}
      direction="column-reverse"
      alignItems="flex-start"
      gap="20px"
      sx={{ backgroundColor: '#FFF', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', overflowY: 'auto' }}
    >
      <Generator />
      <div ref={targetRef} style={{ minHeight: '5px' }} />
      {messages
        .slice()
        .reverse()
        .map(({ message, name }) => (
          <Message key={message} isMine={username === name} message={message} name={name} />
        ))}
      <Stack justifyContent="center" alignItems="center" sx={{ width: '100%', my: '20px' }}>
        <Chip
          label="회의가 시작되었습니다."
          sx={{
            backgroundColor: alpha('#2EA74F', 0.1),
            border: '1.5px solid #2EA74F',
            color: '#2EA74F',
          }}
          size="small"
        />
      </Stack>
    </Stack>
  );
};

export default MessageList;
