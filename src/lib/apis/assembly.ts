import { BILL_INFO_API_URL } from '@/constants/apiUrls';
import apiClient from './apiClient';

export const getBillInfo = (billName: string) => {
  return apiClient({ method: 'get', url: BILL_INFO_API_URL, params: { Type: 'json', BILL_NAME: billName } });
};
