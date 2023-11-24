import { apiClientOfServer } from './apiClient';

export const postSummary = (prompt: string) => {
  return apiClientOfServer.request({
    method: 'post',
    data: {
      prompt,
    },
  });
};
