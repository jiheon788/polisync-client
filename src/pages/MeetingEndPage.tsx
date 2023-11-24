import { useEffect } from 'react';
import { postSummary } from '@/lib/apis/openai';
import useMessagesState from '@/lib/states/messages/useMessagesState';
import { convertArrayToString } from '@/lib/utils/stringHelper';

const MeetingEndPage = () => {
  const { messages } = useMessagesState();

  useEffect(() => {
    postSummary(convertArrayToString(messages)).then((res) => {
      console.log(res);
    });
  }, [messages]);

  return <>MeetingEndPage</>;
};

export default MeetingEndPage;
