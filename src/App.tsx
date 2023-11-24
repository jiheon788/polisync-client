import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { Global } from '@emotion/react';
import DynamicRoutes from './DynamicRoutes';
import queryClient from './lib/queries/queryClient';
import DebugObserver from './lib/states/DebugObserver';
import theme from './styles/theme';
import globalStyles from './styles/globalStyles';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <DebugObserver />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Global styles={globalStyles} />
          <BrowserRouter>
            <DynamicRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
