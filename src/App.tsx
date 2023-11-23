import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import DynamicRoutes from './DynamicRoutes';
import { theme } from './styles/theme';
import queryClient from './lib/queries/queryClient';
import DebugObserver from './lib/states/DebugObserver';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <DebugObserver />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <DynamicRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
