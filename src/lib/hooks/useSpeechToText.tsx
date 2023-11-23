import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

interface IUseSpeechToText {
  startCallback?: () => void;
  stopCallback?: () => void;
  reset?: boolean;
}

const useSpeechToText = ({
  startCallback,
  stopCallback,
  reset,
}: IUseSpeechToText) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

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
    listening,
    startListening,
    stopListening,
    resetTranscript,
  };
};

export default useSpeechToText;
