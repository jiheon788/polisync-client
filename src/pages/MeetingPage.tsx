import { Avatar, Card, CardHeader, Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import useSpeechToText from '@/lib/hooks/useSpeechToText';
import useWebSocket from '@/lib/hooks/useWebSocket';
import useQueryString from '@/lib/hooks/useQueryString';
import routerMeta from '@/lib/routerMeta';
import useScrollTo from '@/lib/hooks/useScrollTo';
import useInput from '@/lib/hooks/useInput';
import useGetBillInfoInfiniteQuery from '@/lib/queries/useGetBillInfoInfiniteQuery';
import useIntersectionObserver from '@/lib/hooks/useIntersectionObserver';
import Loading from '@/components/Loading';

const MeetingPage = () => {
  const [temp, onChangeTemp] = useInput('');
  const { messages, sendMessage } = useWebSocket();
  const { targetRef } = useScrollTo(messages);

  const { getParams } = useQueryString();
  const username = getParams('username');

  const { transcript, browserSupportsSpeechRecognition, listening, startListening, stopListening } = useSpeechToText({
    reset: true,
    stopCallback: () => {
      sendMessage(username, transcript);
    },
  });

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetBillInfoInfiniteQuery('간호사');
  const { observerRef } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  if (!browserSupportsSpeechRecognition) {
    return <Navigate to={routerMeta.NotSupportsSpeechRecognitionPage.path} />;
  }

  return (
    <Stack flexDirection="row" height="100%">
      <Stack flex={0.2} justifyContent="center" gap="30px" alignItems="center">
        <Avatar sx={{ width: '80px', height: '80px' }} />

        <textarea className="temp" value={temp} onChange={onChangeTemp} placeholder="temp" />
        <button
          type="button"
          onClick={() => {
            sendMessage(username, temp);
          }}
        >
          Temp
        </button>

        <textarea className="transcript" value={transcript} readOnly />
        <button type="button" onMouseDown={startListening} onMouseUp={stopListening}>
          {listening ? '음성인식 중..' : '음성인식 시작'}
        </button>
      </Stack>
      <Stack
        flex={0.4}
        sx={{
          backgroundColor: '#fff',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.name}: {msg.message}
          </div>
        ))}
        <div ref={targetRef} />
      </Stack>
      <Stack flex={0.4} sx={{ backgroundColor: '#F9FAFA', overflowY: 'scroll' }}>
        <Stack gap="5px">
          {data?.pages.map(({ rows }) =>
            rows.map((row) => (
              <Card key={row.BILL_ID}>
                <CardHeader title={row.BILL_NAME} subheader={`${row.CURR_COMMITTEE}`}></CardHeader>
              </Card>
            )),
          )}
        </Stack>
        {isFetchingNextPage && <Loading />}
        <div ref={observerRef}></div>
      </Stack>
    </Stack>
  );
};

export default MeetingPage;
