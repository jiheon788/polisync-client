import { BILL_INFO_API_URL } from '@/constants/apiUrls';
import { apiClientOfNationalAssembly } from './apiClient';

export type GetBillInfoResponseType = {
  [key: string]: [
    {
      head: [
        {
          list_total_count: number;
        },
        {
          RESULT: {
            CODE: string;
            MESSAGE: string;
          };
        },
      ];
    },
    {
      row: {
        BILL_ID: string | null;
        BILL_NO: string | null;
        AGE: string | null;
        BILL_NAME: string | null;
        PROPOSER: string | null;
        PROPOSER_KIND: string | null;
        PROPOSE_DT: string | null;
        CURR_COMMITTEE_ID: string | null;
        CURR_COMMITTEE: string | null;
        COMMITTEE_DT: string | null;
        COMMITTEE_PROC_DT: string | null;
        LINK_URL: string | null;
        CMT_PRESENT_DT: string | null;
        PROC_RESULT_CD: string | null;
        CMT_PROC_RESULT_CD: string | null;
        LAW_SUBMIT_DT: string | null;
        LAW_PRESENT_DT: string | null;
        LAW_PROC_DT: string | null;
        PROC_DT: string | null;
        LAW_PROC_RESULT_CD: string | null;
        CMT_PROC_DT: string | null;
      }[];
    },
  ];
};

export const getBillInfo = (pIndex: number, billName: string) => {
  return apiClientOfNationalAssembly.request<GetBillInfoResponseType>({
    method: 'get',
    url: BILL_INFO_API_URL,
    params: { Type: 'json', pSize: 15, pIndex: pIndex, BILL_NAME: billName },
  });
};
