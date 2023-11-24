import { Chip, IconButton, Stack, Typography } from '@mui/material';
import { Shortcut } from '@mui/icons-material';
import { GetBillInfoResponseType } from '@/lib/apis/assembly';

interface IReferenceCard {
  row: GetBillInfoResponseType[string][1]['row'][number];
}
const ReferenceCard = ({ row }: IReferenceCard) => {
  const onLink = (url: string | null) => {
    if (url) {
      window.open(url);
    }
  };

  return (
    <Stack
      key={row.BILL_ID}
      sx={{ backgroundColor: '#FFF', borderRadius: '7px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', p: '8px 10px' }}
      gap={'10px'}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Typography variant="h6">{row.BILL_NAME}</Typography>
        <IconButton
          size="small"
          disabled={!row.LINK_URL}
          onClick={() => {
            onLink(row.LINK_URL);
          }}
        >
          <Shortcut sx={{ color: '#001295' }} />
        </IconButton>
      </Stack>
      <Stack>
        <Typography variant="caption">소관위: {row.CURR_COMMITTEE || ''}</Typography>
        <Typography variant="caption">제안자: {row.PROPOSER || ''}</Typography>
        <Typography variant="caption">제안일: {row.PROPOSE_DT || ''}</Typography>
        <Typography variant="caption">소관위상정일: {row.CMT_PRESENT_DT || ''}</Typography>
        <Typography variant="caption">소관위처리일: {row.CMT_PROC_DT || ''}</Typography>
        <Typography variant="caption">의결일: {row.PROC_DT || ''}</Typography>
      </Stack>
      <Stack flexDirection="row" gap="5px" pt="4px" justifyContent="flex-end" sx={{ width: '100%' }}>
        {row.PROC_RESULT_CD && <Chip label={'본회의심의결과: ' + row.PROC_RESULT_CD} size="small" />}
        {row.CMT_PROC_RESULT_CD && <Chip label={'소관위처리결과: ' + row.CMT_PROC_RESULT_CD} size="small" />}
      </Stack>
    </Stack>
  );
};

export default ReferenceCard;
