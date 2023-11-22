import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import useSpeechToText from '@/lib/hooks/useSpeechToText';

interface IMessages {
  name: string;
  message: string;
}

const socket = io('http://localhost:4000');
const HomePage = () => {
  const { transcript, listening, toggleListening } = useSpeechToText();

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
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

  const sendMessage = () => {
    socket.emit('chat message', { name, message });
    setMessage('');
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="메시지" />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.name}: {msg.message}
          </div>
        ))}
      </div>

      <h1>Web Speech API</h1>
      <textarea className="transcript" value={transcript} />
      <button onClick={toggleListening}>{listening ? '음성인식 중지' : '음성인식 시작'}</button>
    </div>
  );
};

export default HomePage;
