import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ height: '100vh', border: '1px solid #ddd' }}
    >
      <Header />
      <Outlet />
    </Container>
  );
};

export default Layout;
