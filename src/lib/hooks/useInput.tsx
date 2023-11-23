import { useState } from 'react';

type ReturnTypes<T> = [
  T,
  (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
  () => void,
];

const useInput = <T,>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value as unknown as T);
  };

  const onInit = () => {
    setValue(initialValue);
  };

  return [value, onChange, onInit];
};

export default useInput;
