import React, { useState }from 'react';
import { Modal, Box, Typography, Card } from "@mui/material";
import { modalStyle } from '../Utils/Common';
import MapContainer from '../Components/Map';

const Viewmap = (props) => {
  const [open, setOpen] = React.useState(props.openModal);

  const handleClose = () => {
    props.onClick();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      
      <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              View Map
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '300px' }}>
            <MapContainer/>
          

            </Box>
            

            </Typography>
            </Box>
    </Modal>
  );
};

export default Viewmap;

