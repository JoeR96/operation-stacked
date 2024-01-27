import React from 'react';
import { Box } from '@mui/material';
import { sharkImage } from '@operation-stacked/shared-images';

const DashboardHeader: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%">
      <img src={sharkImage} alt="Sharky" style={{ maxWidth: '25%', height: 'auto' }} />
    </Box>
  );
};

export default DashboardHeader;
