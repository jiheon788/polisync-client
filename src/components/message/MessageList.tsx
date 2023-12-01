import { Box, Button, Chip, Stack, alpha } from '@mui/material';
import { Navigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import useMessagesState from '@/lib/states/messages/useMessagesState';
import useScrollTo from '@/lib/hooks/useScrollTo';
import useQueryString from '@/lib/hooks/useQueryString';
import useWebSocket from '@/lib/hooks/useWebSocket';
import useSpeechToText from '@/lib/hooks/useSpeechToText';
import routerMeta from '@/lib/routerMeta';
import Message from './Message';
const MessageList = () => {
  const { getParams } = useQueryString();
  const username = getParams('username');
  const { sendMessage } = useWebSocket(username);
  const { messages } = useMessagesState();
  const { targetRef } = useScrollTo(messages);
  const { transcript, browserSupportsSpeechRecognition, listening, startListening, stopListening } = useSpeechToText({
    reset: true,
    stopCallback: () => {
      if (!!transcript && !!username) {
        sendMessage(username, transcript);
      }
    },
  });

  if (!browserSupportsSpeechRecognition) {
    return <Navigate to={routerMeta.NotSupportsSpeechRecognitionPage.path} replace={false} />;
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
          pb: '12px',
          boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box p={'20px 15px'} height="70px">
          {transcript}
        </Box>
        <Button
          type="button"
          onMouseDown={startListening}
          onMouseUp={stopListening}
          startIcon={listening ? <MicIcon /> : <MicOffIcon />}
          size="large"
          sx={{ minWidth: '135px', animation: listening ? 'wave 1.2s infinite' : '' }}
        >
          {listening ? '음성인식 중..' : '음성인식 시작'}
        </Button>
      </Stack>
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
