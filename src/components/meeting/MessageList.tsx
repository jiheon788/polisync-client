import { Stack } from '@mui/material';
import useMessagesState from '@/lib/states/messages/useMessagesState';
import useScrollTo from '@/lib/hooks/useScrollTo';

const MessageList = () => {
  const { messages } = useMessagesState();
  const { targetRef } = useScrollTo(messages);

  return (
    <Stack
      flex={0.4}
      sx={{
        backgroundColor: '#fff',
      }}
    >
      {messages.map((msg, index) => (
        <div key={index}>
          {msg.name}: {msg.message}
        </div>
      ))}
      <div ref={targetRef} />
    </Stack>
  );
};

export default MessageList;
