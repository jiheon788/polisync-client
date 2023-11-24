import { apiClientOfServer } from './apiClient';

export type PostSummaryResponseType = {
  id: string;
  model: string;
  response: {
    content: string;
    role: string;
  };
};

export const postSummary = (prompt: string) => {
  return apiClientOfServer.request<PostSummaryResponseType>({
    method: 'post',
    url: '/api/openai',
    data: {
      prompt,
    },
  });
};
