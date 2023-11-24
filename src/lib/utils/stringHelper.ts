export const removeFirstSlash = (str: string): string => {
  return str.startsWith('/') ? str.substring(1) : str;
};
