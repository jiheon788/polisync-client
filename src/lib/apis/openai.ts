import { SUMMARY_API_URL } from '@/constants/apiUrls';
import { apiClientOfServer } from './apiClient';

export type GetSummaryResponseType = {
  id: string;
  model: string;
  response: {
    content: string;
    role: string;
  };
};

export const getSummary = (prompt: string) => {
  return apiClientOfServer.request<GetSummaryResponseType>({
    method: 'post',
    url: SUMMARY_API_URL,
    data: {
      prompt,
    },
  });
};
