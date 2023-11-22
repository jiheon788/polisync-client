import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Stack } from '@mui/material';
import useSpeechToText from '@/lib/hooks/useSpeechToText';
import useWebSocket from '@/lib/hooks/useWebSocket';

const HomePage = () => {
  const { transcript, listening, toggleListening } = useSpeechToText();
  const { messages, sendMessage } = useWebSocket();
  const [name, setName] = useState('');

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onToggle = () => {
    toggleListening();

    if (listening) {
      sendMessage(name, transcript);
    }
  };

  return (
    <Stack flexDirection="row" height="100%">
      <Stack flex={0.2} justifyContent="center" gap="30px" alignItems="center">
        <Avatar sx={{ width: '80px', height: '80px' }} />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
        <textarea className="transcript" value={transcript} />
        <button type="button" onClick={onToggle}>
          {listening ? '음성인식 중지' : '음성인식 시작'}
        </button>
      </Stack>
      <Stack
        flex={0.4}
        sx={{
          backgroundColor: '#fff',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.name}: {msg.message}
          </div>
        ))}
        <div ref={bottomRef} />
      </Stack>
      <Stack flex={0.4} sx={{ backgroundColor: '#F9FAFA' }}></Stack>
    </Stack>
  );
};

export default HomePage;
