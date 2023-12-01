import { Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import { GetBillInfoResponseType } from '@/lib/apis/assembly';

interface IReviewStepsProps {
  data: GetBillInfoResponseType[string][1]['row'][number];
}

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

const ReviewSteps = ({ data }: IReviewStepsProps) => {
  const steps = Object.keys(stepMeta).map((key) => {
    const stepMetaKey = key as keyof typeof stepMeta;

    return {
      key: stepMetaKey,
      label: stepMeta[stepMetaKey],
      date: data[stepMetaKey],
    };
  });

  return (
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
  );
};

export default ReviewSteps;
