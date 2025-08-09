import React from 'react';
import { Typography, Box, Alert } from '@mui/material';

const Windows: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        🪟 Windows Automation Tasks
      </Typography>
      <Alert severity="info">
        Windows automation functionality would be implemented here. This would include system operations, 
        application launching, and Windows-specific automation tasks.
      </Alert>
    </Box>
  );
};

export default Windows; 