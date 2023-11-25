import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useExpertSystem from './useExpertSystem';

interface IUseSpeechToTextArgs {
  startCallback?: () => void;
  stopCallback?: () => void;
  reset?: boolean;
}

const useSpeechToText = ({ startCallback, stopCallback, reset }: IUseSpeechToTextArgs) => {
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
    SpeechRecognition.stopListening().then((_) => {
      if (stopCallback) {
        stopCallback();
      }

      if (reset) {
        resetTranscript();
      }
    });
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
