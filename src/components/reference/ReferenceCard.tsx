import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  IconButton,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { Shortcut } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetBillInfoResponseType } from '@/lib/apis/assembly';
import useBoolean from '@/lib/hooks/useBoolean';

const stepMeta = {
  PROPOSE_DT: '제안일',
  COMMITTEE_DT: '소관위회부일',
  COMMITTEE_PROC_DT: '위원회심사처리일',
  CMT_PRESENT_DT: '소관위상정일',
  CMT_PROC_DT: '소관위처리일',
  LAW_SUBMIT_DT: '법사위회부일',
  LAW_PRESENT_DT: '법사위상정일',
  LAW_PROC_DT: '법사위처리일',
  PROC_DT: '의결일',
} as const;

interface IReferenceCardProps {
  row: GetBillInfoResponseType[string][1]['row'][number];
}
const ReferenceCard = ({ row }: IReferenceCardProps) => {
  const [open, onToggle] = useBoolean(false);

  const steps = Object.keys(stepMeta).map((key) => {
    const stepMetaKey = key as keyof typeof stepMeta;

    return {
      key: stepMetaKey,
      label: stepMeta[stepMetaKey],
      date: row[stepMetaKey],
    };
  });

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
        <Stepper orientation="vertical" nonLinear activeStep={1}>
          {steps.map((step) => (
            <Step key={step.key} completed={!!step.date} active={!!step.date}>
              <StepLabel>
                <Typography>{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="caption">{step.date}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
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
