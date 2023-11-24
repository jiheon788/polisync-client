import { Avatar, Box, Button, Chip, Stack, Typography, alpha } from '@mui/material';
import { Navigate } from 'react-router-dom';
import useMessagesState from '@/lib/states/messages/useMessagesState';
import useScrollTo from '@/lib/hooks/useScrollTo';
import useQueryString from '@/lib/hooks/useQueryString';
import useWebSocket from '@/lib/hooks/useWebSocket';
import useSpeechToText from '@/lib/hooks/useSpeechToText';
import routerMeta from '@/lib/routerMeta';
import { generateAvatar } from '@/lib/utils/avatarGenerator';

const MessageList = () => {
  const { sendMessage } = useWebSocket();
  const { transcript, browserSupportsSpeechRecognition, listening, startListening, stopListening } = useSpeechToText({
    reset: true,
    stopCallback: () => {
      sendMessage(username, transcript);
    },
  });

  const { messages } = useMessagesState();
  const { targetRef } = useScrollTo(messages);

  const { getParams } = useQueryString();
  const username = getParams('username');

  const temp = [
    ...messages,
    // {
    //   name: 'others',
    //   message:
    //     'To align messages to the right if they are sent by the user (i.e., "mine") and to the left if they are from others, you can use conditional styling based on the isMine flag.',
    // },
    // {
    //   name: username,
    //   message:
    //     'To align messages to the right if they are sent by the user (i.e., "mine") and to the left if they are from others, you can use conditional styling based on the isMine flag.',
    // },
    // {
    //   name: 'others',
    //   message: 'To align messages',
    // },
  ];

  if (!browserSupportsSpeechRecognition) {
    return <Navigate to={routerMeta.NotSupportsSpeechRecognitionPage.path} />;
  }

  return (
    <Stack
      flex={0.4}
      direction="column-reverse"
      alignItems="flex-start"
      gap="20px"
      sx={{ backgroundColor: '#FFF', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', overflowY: 'auto' }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '100%',
          pb: '15px',
          boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box p={'20px 15px'}>
          {transcript}o align messages to the right if they are sent by the user and to the left if they are from
          others, you can use conditional styling based on the isMine flag.
        </Box>
        <Button type="button" onMouseDown={startListening} onMouseUp={stopListening}>
          {listening ? '음성인식 중..' : '음성인식 시작'}
        </Button>
      </Stack>
      <div ref={targetRef} style={{ minHeight: '5px' }} />

      {temp
        .slice()
        .reverse()
        .map((message, index) => {
          const isMine = username === message.name;

          return (
            <Stack
              key={index}
              flexDirection="row"
              gap="10px"
              sx={{
                p: '12px 10px',
                alignSelf: isMine ? 'flex-end' : 'flex-start',
              }}
            >
              {!isMine && <Avatar {...generateAvatar(message.name)} />}
              <Box
                sx={{
                  background: isMine ? 'linear-gradient(25deg, #001295, #283FD0)' : '#F9FAFA',
                  p: '12px 12px',
                  borderRadius: isMine ? '15px 15px 0 15px' : '15px 15px 15px 0',
                  color: isMine ? '#FFF' : '#333',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="subtitle2">{message.name} :</Typography>
                {message.message}
              </Box>
            </Stack>
          );
        })}
      <Stack justifyContent="center" alignItems="center" sx={{ width: '100%', my: '20px' }}>
        <Chip
          label="회의가 시작되었습니다."
          sx={{
            backgroundColor: alpha('#2EA74F', 0.2),
            border: '1.5px solid #2EA74F',
            color: '#2EA74F',
            fontWeight: 'bold',
          }}
          size="small"
        />
      </Stack>
    </Stack>
  );
};

export default MessageList;
