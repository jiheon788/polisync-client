import { BILL_INFO_API_URL, MEMBER_INFO_API_URL } from '@/constants/apiUrls';
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

export const getBillInfo = (billName: string, page: number) => {
  return apiClientOfNationalAssembly.request<GetBillInfoResponseType>({
    method: 'get',
    url: BILL_INFO_API_URL,
    params: { Type: 'json', pSize: 15, pIndex: page, BILL_NAME: billName },
  });
};

export type GetMemberInfoResponseType = {
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
        HG_NM: string | null;
        HJ_NM: string | null;
        BTH_GBN_NM: string | null;
        BTH_DATE: string | null;
        JOB_RES_NM: string | null;
        POLY_NM: string | null;
        ORIG_NM: string | null;
        ELECT_GBN_NM: string | null;
        CMIT_NM: string | null;
        CMITS: string | null;
        REELE_GBN_NM: string | null;
        UNITS: string | null;
        SEX_GBN_NM: string | null;
        TEL_NO: string | null;
        E_MAIL: string | null;
        HOMEPAGE: string | null;
        STAFF: string | null;
        SECRETARY: string | null;
        SECRETARY2: string | null;
        MONA_CD: string | null;
        MEM_TITLE: string | null;
        ASSEM_ADDR: string | null;
      }[];
    },
  ];
};

export const getMemberInfo = (memberName: string, page: number) => {
  return apiClientOfNationalAssembly.request<GetMemberInfoResponseType>({
    method: 'get',
    url: MEMBER_INFO_API_URL,
    params: { Type: 'json', pSize: 15, pIndex: page, HG_NM: memberName },
  });
};
