import { Stack } from '@mui/material';
import ReferenceList from '@/components/meeting/ReferenceList';
import MessageList from '@/components/meeting/MessageList';
import UserController from '@/components/meeting/UserController';

const MeetingPage = () => {
  return (
    <Stack flexDirection="row" height="95vh">
      <UserController />
      <MessageList />
      <ReferenceList />
    </Stack>
  );
};

export default MeetingPage;
