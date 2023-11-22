import { Button, Stack } from '@mui/material';

const Header = () => {
  return (
    <header>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ height: '80px', borderBottom: '1px solid #ddd', backgroundColor: '#fff', px: '20px' }}
      >
        <Button variant="contained">회의시작</Button>
      </Stack>
    </header>
  );
};

export default Header;
