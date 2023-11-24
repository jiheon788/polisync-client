import { Box, CircularProgress, Stack } from '@mui/material';

const Loading = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
