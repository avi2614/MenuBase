import React from 'react';
import { Typography, Box, Alert } from '@mui/material';

const Docker: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        🐳 Docker via SSH (Remote Execution)
      </Typography>
      <Alert severity="info">
        Docker management functionality would be implemented here. This would include container management, 
        image operations, and remote Docker command execution.
      </Alert>
    </Box>
  );
};

export default Docker; 