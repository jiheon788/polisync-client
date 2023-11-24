import { IMessages } from '../states/messages/atoms';

export const removeFirstSlash = (str: string) => {
  return str.startsWith('/') ? str.substring(1) : str;
};

export const convertArrayToString = (arr: IMessages[]) => {
  return arr.map((obj) => `${obj.name}: ${obj.message}\n`).join('');
};

const keywords = ['발의법률안', '법률안', '일부개정법률안', '전부개정법률안', '법률', '법안'];

export const containsKeyword = (text: string) => {
  const regexPattern = keywords.map((keyword) => keyword.replace(/\s+/g, '\\s*')).join('|');
  const regex = new RegExp(regexPattern);

  return regex.test(text);
};

export const findWordBeforeKeyword = (text: string) => {
  const words = text.split(/\s+/);

  for (let i = 1; i < words.length; i++) {
    if (containsKeyword(words[i])) {
      return words[i - 1];
    }
  }

  return '';
};
