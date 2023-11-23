import { useEffect } from 'react';
import io from 'socket.io-client';
import { SOCKET_SERVER_URL } from '@/constants/config';
import useMessagesState from '../states/messages/useMessagesState';

if (!SOCKET_SERVER_URL) throw new Error('SOCKET_SERVER_URL is not defined');

const socket = io(SOCKET_SERVER_URL);

const useWebSocket = () => {
  const { messages, receiveMessage } = useMessagesState();

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
