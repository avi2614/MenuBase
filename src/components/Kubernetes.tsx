import React from 'react';
import { Typography, Box, Alert } from '@mui/material';

const Kubernetes: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        ☸ Kubernetes Control Panel
      </Typography>
      <Alert severity="info">
        Kubernetes management functionality would be implemented here. This would include pod management, 
        service deployment, and cluster operations.
      </Alert>
    </Box>
  );
};

export default Kubernetes; 