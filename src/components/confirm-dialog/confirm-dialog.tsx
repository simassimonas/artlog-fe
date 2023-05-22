import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const ConfirmDialog = ({ title, children, open, setOpen, onConfirm }: any) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <button
          className="action-button action-button--light"
          onClick={() => setOpen(false)}
        >
          No
        </button>

        <button
          className="action-button"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Yes
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
