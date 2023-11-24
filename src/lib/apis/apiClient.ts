import axios from 'axios';
import { NATIONAL_ASSEMBLY_OPEN_API_KEY, NATIONAL_ASSEMBLY_OPEN_API_URL, SERVER_URL } from '@/constants/config';

if (!SERVER_URL) throw new Error('SERVER_URL is not defined');
if (!NATIONAL_ASSEMBLY_OPEN_API_URL) throw new Error('NATIONAL_ASSEMBLY_OPEN_API_URL is not defined');
if (!NATIONAL_ASSEMBLY_OPEN_API_KEY) throw new Error('NATIONAL_ASSEMBLY_OPEN_API_KEY is not defined');

export const apiClientOfServer = axios.create({
  baseURL: SERVER_URL,
});

export const apiClientOfNationalAssembly = axios.create({
  baseURL: NATIONAL_ASSEMBLY_OPEN_API_URL,
});
apiClientOfNationalAssembly.interceptors.request.use((request) => {
  const params = request.params ? { ...request.params } : {};
  params.KEY = NATIONAL_ASSEMBLY_OPEN_API_KEY;
  request.params = params;

  return request;
});
