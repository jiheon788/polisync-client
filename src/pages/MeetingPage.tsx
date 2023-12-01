import { Stack } from '@mui/material';
import ReferenceList from '@/components/reference/ReferenceList';
import MessageList from '@/components/message/MessageList';
import UserList from '@/components/user/UserList';

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
