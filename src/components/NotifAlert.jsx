import React from 'react';
import { Snackbar } from '@mui/material';

function NotifAlert(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={open}
            onClose={handleClose}
            message={props.message}
            key={'bottom' + 'left'}
        />
    )
}

export default NotifAlert;