import { IMessages } from '../states/messages/atoms';

export const removeFirstSlash = (str: string): string => {
  return str.startsWith('/') ? str.substring(1) : str;
};

export const convertArrayToString = (arr: IMessages[]) => {
  return arr.map((obj) => `${obj.name}: ${obj.message}\n`).join('');
};
