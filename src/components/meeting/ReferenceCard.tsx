import { Card, CardHeader } from '@mui/material';
import { GetBillInfoResponseType } from '@/lib/apis/assembly';

interface IReferenceCard {
  row: GetBillInfoResponseType[string][1]['row'][number];
}
const ReferenceCard = ({ row }: IReferenceCard) => {
  return (
    <Card key={row.BILL_ID}>
      <CardHeader title={row.BILL_NAME} subheader={`${row.CURR_COMMITTEE}`}></CardHeader>
    </Card>
  );
};

export default ReferenceCard;
