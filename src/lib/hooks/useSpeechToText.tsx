import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect } from 'react';
import useExpertSystem from './useExpertSystem';

interface IUseSpeechToText {
  startCallback?: () => void;
  stopCallback?: () => void;
  reset?: boolean;
}

const useSpeechToText = ({ startCallback, stopCallback, reset }: IUseSpeechToText) => {
  const commands = useExpertSystem();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({
    commands,
  });

  const startListening = () => {
    SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });

    if (startCallback) {
      startCallback();
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();

    if (stopCallback) {
      stopCallback();
    }

    if (reset) {
      resetTranscript();
    }
  };

  return {
    transcript,
    browserSupportsSpeechRecognition,
    listening,
    startListening,
    stopListening,
    resetTranscript,
  };
};

export default useSpeechToText;
