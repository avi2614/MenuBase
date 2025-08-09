import React from 'react';
import { Typography, Box, Alert } from '@mui/material';

const Linux: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        🐧 Linux Remote Terminal + AI
      </Typography>
      <Alert severity="info">
        Linux SSH functionality would be implemented here. This would include remote command execution, 
        file management, and AI-powered command explanations.
      </Alert>
    </Box>
  );
};

export default Linux; 