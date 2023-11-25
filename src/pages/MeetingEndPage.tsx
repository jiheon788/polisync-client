import { Stack, Typography } from '@mui/material';
import useMessagesState from '@/lib/states/messages/useMessagesState';
import { convertArrayToString } from '@/lib/utils/stringHelper';
import useGetSummaryQuery from '@/lib/queries/useGetSummaryQuery';
import Loading from '@/components/common/Loading';

const MeetingEndPage = () => {
  const { messages } = useMessagesState();
  const { data, isLoading } = useGetSummaryQuery(convertArrayToString(messages), messages.length > 0);

  if (isLoading) {
    return (
      <Stack gap="30px" justifyContent="center" alignItems="center" mt="30px" sx={{ width: '100%', height: '100%' }}>
        <Loading />
        <Typography variant="h4">회의 요약문을 생성중입니다...</Typography>
      </Stack>
    );
  }
  return (
    <Stack gap="30px" justifyContent="center" alignItems="center" mt="30px" sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h3">요약본</Typography>
      <Stack>
        {data?.response.content.split('\n').map((content, index) => (
          <Typography key={index} variant="body1">
            {content}
          </Typography>
        ))}
      </Stack>
      <Typography variant="caption">made by {data?.model}.</Typography>
    </Stack>
  );
};

export default MeetingEndPage;
