import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface IUseSpeechToTextArgs {
  startCallback?: () => void;
  stopCallback?: () => void;
  reset?: boolean;
}

const commonOptions = {
  isFuzzyMatch: true,
  bestMatchOnly: true,
  fuzzyMatchingThreshold: 0.2,
};

const useSpeechToText = ({ startCallback, stopCallback, reset }: IUseSpeechToTextArgs) => {
  const commands = [
    {
      command: '이상 회의를 마치겠습니다',
      callback: () => null,
    },
    {
      command: ['* 발의법률안 *', '* 법률안 *', '* 일부개정법률안 *', '* 전부개정법률안 *', '* 법률 *'],
      callback: () => null,
    },
  ].map((command) => ({ ...command, ...commonOptions }));

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
