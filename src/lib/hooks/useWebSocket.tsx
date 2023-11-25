import { useEffect } from 'react';
import io from 'socket.io-client';
import { SERVER_URL } from '@/constants/config';
import useMessagesState from '../states/messages/useMessagesState';

if (!SERVER_URL) throw new Error('SERVER_URL is not defined');

const useWebSocket = (username: string) => {
  const { messages, receiveMessage } = useMessagesState();
  const socket = io(SERVER_URL, {
    query: { username },
  });

  useEffect(() => {
    socket.on('chat message', receiveMessage);

    return () => {
      socket.off('chat message', receiveMessage);
    };
  }, []);

  const sendMessage = (name: string, message: string) => {
    socket.emit('chat message', { name, message });
  };

  return { messages, sendMessage };
};

export default useWebSocket;
