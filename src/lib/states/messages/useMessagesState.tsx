import { useRecoilState } from 'recoil';

import { DEFAULT_MESSAGES_STATE, IMessages, messagesState } from './atoms';

const useMessagesState = () => {
  const [messages, setMessages] = useRecoilState(messagesState);

  const receiveMessage = (receivedMessage: IMessages) => {
    setMessages((currentMessages) => [...currentMessages, receivedMessage]);
  };

  const onInitMessages = () => {
    setMessages(DEFAULT_MESSAGES_STATE);
  };

  return { messages, receiveMessage, onInitMessages };
};

export default useMessagesState;
