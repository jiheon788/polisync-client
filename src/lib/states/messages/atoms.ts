import { atom } from 'recoil';

export interface IMessage {
  name: string;
  message: string;
}

export const DEFAULT_MESSAGES_STATE: IMessage[] = [];

export const messagesState = atom<IMessage[]>({
  key: 'messages',
  default: DEFAULT_MESSAGES_STATE,
});
