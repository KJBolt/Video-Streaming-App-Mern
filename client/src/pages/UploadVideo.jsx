import { Box } from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';
import UploadVideoContent from '../components/UploadVideoContent';

function UploadVideo() {
  return (
    <Box>
        <Navbar />

        <Box>
            <UploadVideoContent />
        </Box> 
    </Box>
    
  )
}

export default UploadVideo
