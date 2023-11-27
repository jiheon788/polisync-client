import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';
import routerMeta from '@/lib/routerMeta';
import useInput from '@/lib/hooks/useInput';

const HomePage = () => {
  const [username, onChangeUsername] = useInput('');
  const navigate = useNavigate();

  const onEnter = () => {
    navigate(`${routerMeta.MeetingPage.path}?username=${username}`);
  };

  return (
    <Stack sx={{ width: '100%', height: '100%' }} gap="20px" justifyContent="center" alignItems="center">
      <Typography variant="h4">음성인식 기반 국무 회의 AI 비서 서비스</Typography>
      <Typography variant="h1" sx={{ fontSize: '100px', marginTop: '-25px', mb: '50px' }}>
        PoliSync
      </Typography>
      <TextField
        value={username}
        onChange={onChangeUsername}
        placeholder="이름을 입력하세요"
        sx={{
          width: '400px',
        }}
      />
      <Button
        size="large"
        sx={{
          width: '400px',
          paddingX: '100px',
          borderColor: 'linear-gradient(25deg, #001295, #283FD0)',
          borderWidth: '2px',
          fontSize: '20px',
        }}
        onClick={onEnter}
      >
        시작하기
      </Button>
    </Stack>
  );
};

export default HomePage;
