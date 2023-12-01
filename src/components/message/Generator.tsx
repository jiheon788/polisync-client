import { Box, Button, Stack, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import useQueryString from '@/lib/hooks/useQueryString';
import useWebSocket from '@/lib/hooks/useWebSocket';
import useSpeechToText from '@/lib/hooks/useSpeechToText';
const Generator = () => {
  const { getParams } = useQueryString();
  const username = getParams('username');
  const { sendMessage } = useWebSocket(username);
  const { transcript, browserSupportsSpeechRecognition, listening, startListening, stopListening } = useSpeechToText({
    reset: true,
    stopCallback: () => {
      if (!!transcript && !!username) {
        sendMessage(username, transcript);
      }
    },
  });

  return (
    <Stack
      sx={{
        width: '100%',
        pb: '12px',
        boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      {browserSupportsSpeechRecognition ? (
        <Stack justifyContent="center" alignItems="center">
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
      ) : (
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="h3">Not Supported Browser</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default Generator;
