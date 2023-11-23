import { BILL_INFO_API_URL } from '@/constants/apiUrls';
import apiClient from './apiClient';

export const getBillInfo = (pIndex: number, billName: string) => {
  return apiClient({
    method: 'get',
    url: BILL_INFO_API_URL,
    params: { Type: 'json', pSize: 5, pIndex: pIndex, BILL_NAME: billName },
  });
};
