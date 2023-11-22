import React, { useState, useEffect } from 'react';
import useSpeechToText from '@/lib/hooks/useSpeechToText';
import useWebSocket from '@/lib/hooks/useWebSocket';

const HomePage = () => {
  const { transcript, listening, toggleListening } = useSpeechToText();
  const { messages, sendMessage } = useWebSocket();
  const [name, setName] = useState('');

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <textarea className="transcript" value={transcript} />
      <button onClick={toggleListening}>{listening ? '음성인식 중지' : '음성인식 시작'}</button>
      <button
        type="button"
        onClick={() => {
          sendMessage(name, transcript);
        }}
      >
        Send
      </button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.name}: {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
