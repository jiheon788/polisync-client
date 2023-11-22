import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import DynamicRoutes from './DynamicRoutes';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <DynamicRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
