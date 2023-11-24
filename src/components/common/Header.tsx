import { Button, Stack } from '@mui/material';
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
        justifyContent="flex-end"
        sx={{ height: '80px', borderBottom: '1px solid #ddd', backgroundColor: '#fff', px: '20px' }}
      >
        <Button variant="contained" onClick={onEnd}>
          회의종료
        </Button>
      </Stack>
    </header>
  );
};

export default Header;
