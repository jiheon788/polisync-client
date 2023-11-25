import { Avatar, Stack } from '@mui/material';
import useWebSocket from '@/lib/hooks/useWebSocket';
import useQueryString from '@/lib/hooks/useQueryString';
import useInput from '@/lib/hooks/useInput';
import { generateAvatar } from '@/lib/utils/avatarGenerator';

const UserController = () => {
  const [temp, onChangeTemp] = useInput('');
  const { getParams } = useQueryString();
  const username = getParams('username');
  const { sendMessage } = useWebSocket(username);

  return (
    <Stack flex={0.2} justifyContent="center" gap="30px" alignItems="center" sx={{ backgroundColor: '#ECF0FE' }}>
      <Avatar {...generateAvatar(username, { width: '80px', height: '80px' })} />

      <textarea className="temp" value={temp} onChange={onChangeTemp} placeholder="temp" />
      <button
        type="button"
        onClick={() => {
          sendMessage(username, temp);
        }}
      >
        Temp
      </button>
    </Stack>
  );
};

export default UserController;
