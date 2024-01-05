import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAlertStore } from '../../store/AlertStore';

const CommonSnackbar = () => {
  const { type, message, open } = useAlertStore();

  const { setClose } = useAlertStore();

  const handleClose = () => {
    setClose();
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default CommonSnackbar;
