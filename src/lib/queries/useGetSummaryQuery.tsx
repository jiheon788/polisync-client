import { useQuery } from '@tanstack/react-query';
import { SUMMARY_API_URL } from '@/constants/apiUrls';
import { getSummary } from '../apis/openai';

const useGetSummaryQuery = (prompt: string, enabled: boolean) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [SUMMARY_API_URL],
    queryFn: () =>
      getSummary(prompt).then((res) => {
        return res.data;
      }),
    enabled,
  });
  return { data, isError, isLoading };
};

export default useGetSummaryQuery;
