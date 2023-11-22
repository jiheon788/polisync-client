import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { SOCKET_SERVER_URL } from '@/constants/config';

export interface IMessages {
  name: string;
  message: string;
}
if (!SOCKET_SERVER_URL) throw new Error('SOCKET_SERVER_URL is not defined');

const socket = io(SOCKET_SERVER_URL);

const useWebSocket = () => {
  const [messages, setMessages] = useState<IMessages[]>([]);

  useEffect(() => {
    const receiveMessage = (data: IMessages) => {
      setMessages((currentMessages) => [...currentMessages, data]);
    };

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
