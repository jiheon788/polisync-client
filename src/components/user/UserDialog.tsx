import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { MemberInfoType } from './UserList';

interface IUserDialogProps {
  open: boolean;
  onClose: () => void;
  user: MemberInfoType | null;
}
const UserDialog = ({ open, onClose, user }: IUserDialogProps) => {
  if (!user) {
    onClose();
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>{`${user.HG_NM} ${user.JOB_RES_NM}`}</DialogTitle>
      <DialogContent>
        {user.MEM_TITLE?.split('\n').map((line, index, array) => (
          <React.Fragment key={index}>
            {line}
            {index !== array.length - 1 && <br />}
          </React.Fragment>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
