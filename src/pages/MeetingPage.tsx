import { Stack } from '@mui/material';
import ReferenceList from '@/components/meeting/ReferenceList';
import MessageList from '@/components/meeting/MessageList';
import UserController from '@/components/meeting/UserController';

const MeetingPage = () => {
  return (
    <Stack flexDirection="row" height="100%">
      <UserController />
      <MessageList />
      <ReferenceList />
    </Stack>
  );
};

export default MeetingPage;
