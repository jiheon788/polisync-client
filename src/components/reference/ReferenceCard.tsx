import { Accordion, AccordionDetails, AccordionSummary, Chip, IconButton, Stack, Typography } from '@mui/material';
import { Shortcut } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetBillInfoResponseType } from '@/lib/apis/assembly';
import useBoolean from '@/lib/hooks/useBoolean';
import ReviewSteps from './ReviewSteps';

interface IReferenceCardProps {
  row: GetBillInfoResponseType[string][1]['row'][number];
}
const ReferenceCard = ({ row }: IReferenceCardProps) => {
  const [open, onToggle] = useBoolean(false);

  const onLink = (url: string | null) => {
    if (url) {
      window.open(url);
    }
  };

  return (
    <Accordion expanded={open} onChange={onToggle}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack>
          <Typography variant="h6">{`제 ${row.AGE}대 국회: ${row.BILL_NAME}`}</Typography>
          <Typography variant="caption">소관위: {row.CURR_COMMITTEE || ''}</Typography>
          <Typography variant="caption">
            제안자: {row.PROPOSER || ''} {row.PROPOSER_KIND}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <ReviewSteps data={row} />
        <Stack
          flexDirection="row"
          gap="5px"
          mt="18px"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Stack flexDirection="row" gap="5px">
            {row.CMT_PROC_RESULT_CD && <Chip label={'소관위처리결과: ' + row.CMT_PROC_RESULT_CD} size="small" />}
            {row.LAW_PROC_RESULT_CD && <Chip label={'법사위처리결과: ' + row.LAW_PROC_RESULT_CD} size="small" />}
            {row.PROC_RESULT_CD && <Chip label={'본회의심의결과: ' + row.PROC_RESULT_CD} size="small" />}
          </Stack>
          <IconButton
            size="small"
            disabled={!row.LINK_URL}
            onClick={() => {
              onLink(row.LINK_URL);
            }}
          >
            <Shortcut />
          </IconButton>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReferenceCard;
