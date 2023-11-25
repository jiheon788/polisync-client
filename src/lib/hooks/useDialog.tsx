import { useState } from 'react';

type ReturnTypes = [boolean, () => void, () => void];

const useDialog = (): ReturnTypes => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return [open, onOpen, onClose];
};

export default useDialog;
