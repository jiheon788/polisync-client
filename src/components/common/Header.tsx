import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routerMeta from '@/lib/routerMeta';

const Header = () => {
  const navigate = useNavigate();

  const onEnd = () => {
    navigate(routerMeta.MeetingEndPage.path);
  };
  return (
    <header>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: '5vh', borderBottom: '1px solid #ddd', backgroundColor: '#fff', px: '20px' }}
      >
        <Typography variant="h5">PoliSync</Typography>
        <Button onClick={onEnd}>회의종료</Button>
      </Stack>
    </header>
  );
};

export default Header;
