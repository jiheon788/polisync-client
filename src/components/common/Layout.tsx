import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <Box sx={{ border: '1px solid #ddd', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Header />
      <Outlet />
    </Box>
  );
};

export default Layout;
