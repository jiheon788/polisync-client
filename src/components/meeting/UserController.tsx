import { Avatar, Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import useSpeechToText from '@/lib/hooks/useSpeechToText';
import useWebSocket from '@/lib/hooks/useWebSocket';
import useQueryString from '@/lib/hooks/useQueryString';
import routerMeta from '@/lib/routerMeta';
import useInput from '@/lib/hooks/useInput';
import { generateAvatar } from '@/lib/utils/avatarGenerator';

const UserController = () => {
  const [temp, onChangeTemp] = useInput('');
  const { sendMessage } = useWebSocket();
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
    <Stack flex={0.2} justifyContent="center" gap="30px" alignItems="center" sx={{ backgroundColor: '#ECF0FE' }}>
      <Avatar {...generateAvatar(username, { width: '80px', height: '80px' })} />

      <textarea className="temp" value={temp} onChange={onChangeTemp} placeholder="temp" />
      <button
        type="button"
        onClick={() => {
          sendMessage(username, temp);
        }}
      >
        Temp
      </button>

      <textarea className="transcript" value={transcript} readOnly />
      <button type="button" onMouseDown={startListening} onMouseUp={stopListening}>
        {listening ? '음성인식 중..' : '음성인식 시작'}
      </button>
    </Stack>
  );
};

export default UserController;
