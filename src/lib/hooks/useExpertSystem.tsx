const commonOptions = {
  isFuzzyMatch: true,
  bestMatchOnly: true,
  fuzzyMatchingThreshold: 0.2,
};

const useExpertSystem = () => {
  const commands = [
    {
      command: '이상 회의를 마치겠습니다',
      callback: () => null,
    },
    {
      command: ['* 발의법률안 *', '* 법률안 *', '* 일부개정법률안 *', '* 전부개정법률안 *', '* 법률 *'],
      callback: () => console.log('command'),
    },
  ];

  return commands.map((command) => ({ ...command, ...commonOptions }));
};

export default useExpertSystem;
