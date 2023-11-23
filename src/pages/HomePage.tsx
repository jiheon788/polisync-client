import { useNavigate } from 'react-router-dom';
import routerMeta from '@/lib/routerMeta';
import useInput from '@/lib/hooks/useInput';

const HomePage = () => {
  const [username, onChangeUsername] = useInput('');
  const navigate = useNavigate();

  const onEnter = () => {
    navigate(`${routerMeta.MeetingPage.path}?username=${username}`);
  };

  return (
    <>
      <input value={username} onChange={onChangeUsername} placeholder="이름" />
      <button type="button" onClick={onEnter}>
        Enter
      </button>
    </>
  );
};

export default HomePage;
