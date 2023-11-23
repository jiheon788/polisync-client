import { Avatar, Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import useSpeechToText from '@/lib/hooks/useSpeechToText';
import useWebSocket from '@/lib/hooks/useWebSocket';
import useQueryString from '@/lib/hooks/useQueryString';
import routerMeta from '@/lib/routerMeta';
import useScrollTo from '@/lib/hooks/useScrollTo';

const MeetingPage = () => {
  const { messages, sendMessage } = useWebSocket();
  const { targetRef } = useScrollTo(messages);

  const { getParams } = useQueryString();
  const username = getParams('username');

  const { transcript, browserSupportsSpeechRecognition, listening, startListening, stopListening } = useSpeechToText({
    reset: true,
    stopCallback: () => {
      sendMessage(username, transcript);
    },
  });

  if (!browserSupportsSpeechRecognition) {
    return <Navigate to={routerMeta.NotSupportsSpeechRecognitionPage.path} />;
  }

  return (
    <Stack flexDirection="row" height="100%">
      <Stack flex={0.2} justifyContent="center" gap="30px" alignItems="center">
        <Avatar sx={{ width: '80px', height: '80px' }} />

        <textarea className="transcript" value={transcript} />
        <button type="button" onMouseDown={startListening} onMouseUp={stopListening}>
          {listening ? '음성인식 중..' : '음성인식 시작'}
        </button>
      </Stack>
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
      <Stack flex={0.4} sx={{ backgroundColor: '#F9FAFA' }}></Stack>
    </Stack>
  );
};

export default MeetingPage;
