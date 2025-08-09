import React from 'react';
import { Typography, Box, Alert } from '@mui/material';

const AWS: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        🚀 AWS EC2 Automation Dashboard
      </Typography>
      <Alert severity="info">
        AWS EC2 management functionality would be implemented here. This would include instance creation, 
        termination, and cloud resource management.
      </Alert>
    </Box>
  );
};

export default AWS; 