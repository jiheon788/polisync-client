import { Stack } from '@mui/material';
import ReferenceList from '@/components/meeting/ReferenceList';
import MessageList from '@/components/meeting/MessageList';
import UserList from '@/components/meeting/UserList';

const MeetingPage = () => {
  return (
    <Stack flexDirection="row" height="95vh">
      <UserList />
      <MessageList />
      <ReferenceList />
    </Stack>
  );
};

export default MeetingPage;
