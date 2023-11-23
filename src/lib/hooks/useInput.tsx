import { useState } from 'react';

type ReturnTypes = [
  string,
  (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void,
  () => void,
];

const useInput = (initialValue: string): ReturnTypes => {
  const [value, setValue] = useState(initialValue);

  const onChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setValue(event.target.value);
  };

  const onInit = () => {
    setValue(initialValue);
  };

  return [value, onChange, onInit];
};

export default useInput;
