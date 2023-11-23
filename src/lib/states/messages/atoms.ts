import { atom } from 'recoil';

export interface IMessages {
  name: string;
  message: string;
}

export const DEFAULT_MESSAGES_STATE: IMessages[] = [];

export const messagesState = atom<IMessages[]>({
  key: 'messages',
  default: DEFAULT_MESSAGES_STATE,
});
