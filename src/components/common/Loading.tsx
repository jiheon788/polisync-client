import { Box, CircularProgress, Stack } from '@mui/material';

const Loading = () => {
  return (
    <Stack justifyContent="center" alignItems="center" minHeight={'100px'}>
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
