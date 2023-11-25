import { AvatarOwnProps } from '@mui/material';

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const generateAvatar = (name: string, sx?: AvatarOwnProps['sx']) => {
  const nameParts = name.split(' ');

  let initials;
  const isKorean = /[\u3131-\uD79D]/giu.test(name);

  if (isKorean) {
    initials = nameParts[0][0];
  } else if (nameParts.length > 1) {
    initials = `${nameParts[0][0]}${nameParts[1][0]}`;
  } else {
    initials = nameParts[0].length > 1 ? `${nameParts[0][0]}${nameParts[0][1]}` : nameParts[0][0];
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
      ...sx,
    },
    children: initials,
  };
};
