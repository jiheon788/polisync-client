import { SUMMARY_API_URL } from '@/constants/apiUrls';
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
    url: SUMMARY_API_URL,
    data: {
      prompt,
    },
  });
};
