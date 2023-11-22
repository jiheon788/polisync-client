import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export interface IMessages {
  name: string;
  message: string;
}

const socket = io('http://localhost:4000');

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
