import axios from 'axios';
import { NATIONAL_ASSEMBLY_OPEN_API_KEY, NATIONAL_ASSEMBLY_OPEN_API_URL } from '@/constants/config';

if (!NATIONAL_ASSEMBLY_OPEN_API_URL) throw new Error('NATIONAL_ASSEMBLY_OPEN_API_URL is not defined');
if (!NATIONAL_ASSEMBLY_OPEN_API_KEY) throw new Error('NATIONAL_ASSEMBLY_OPEN_API_KEY is not defined');

const apiClient = axios.create({
  baseURL: NATIONAL_ASSEMBLY_OPEN_API_URL,
});

apiClient.interceptors.request.use((request) => {
  const params = request.params ? { ...request.params } : {};
  params.KEY = NATIONAL_ASSEMBLY_OPEN_API_KEY;
  request.params = params;

  return request;
});

export default apiClient;
