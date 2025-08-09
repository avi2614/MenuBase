import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Paper
} from '@mui/material';

import {
  WhatsApp as WhatsAppIcon,
  Psychology as PsychologyIcon,
  Web as WebIcon,
  Terminal as TerminalIcon,
  Storage as StorageIcon,
  Cloud as CloudIcon,
  AccountTree as AccountTreeIcon,
  SmartToy as SmartToyIcon,
  Computer as ComputerIcon
} from '@mui/icons-material';

const Home: React.FC = () => {
  const features = [
    {
      icon: <WhatsAppIcon />,
      title: '📲 Automate Real-world Tasks',
      description: 'WhatsApp, Email, Instagram automation'
    },
    {
      icon: <WebIcon />,
      title: '🌐 HTML/JS Tools',
      description: 'Camera, Location, SMS utilities'
    },
    {
      icon: <TerminalIcon />,
      title: '🐧 Control Linux Machines',
      description: 'SSH with voice and GUI control'
    },
    {
      icon: <StorageIcon />,
      title: '🐳 Manage Docker Containers',
      description: 'Interactive container management'
    },
    {
      icon: <PsychologyIcon />,
      title: '🤖 Ask Gemini AI',
      description: 'AI-powered assistance'
    },
    {
      icon: <PsychologyIcon />,
      title: '📊 Machine Learning Models',
      description: 'Linear Regression, Random Forest training'
    },
    {
      icon: <PsychologyIcon />,
      title: '📈 Visualize & Predict',
      description: 'Real-time predictions and graphs'
    },
    {
      icon: <ComputerIcon />,
      title: '🌗 Light/Dark Mode',
      description: 'Toggle themes with toast alerts'
    }
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Multiple Things On Single Platform
      </Typography>
      
      <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'text.secondary' }}>
        Welcome to <strong>Menu Base</strong>
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'background.default' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          🚀 Features
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {features.map((feature, index) => (
            <Box key={index} sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ mr: 2, color: 'primary.main' }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3">
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, backgroundColor: 'background.default' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          🎯 Quick Access
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Chip 
            icon={<WhatsAppIcon />} 
            label="Python Automation" 
            color="primary" 
            variant="outlined"
          />
          <Chip 
            icon={<WebIcon />} 
            label="HTML/JS Tools" 
            color="secondary" 
            variant="outlined"
          />
          <Chip 
            icon={<PsychologyIcon />} 
            label="Machine Learning" 
            color="success" 
            variant="outlined"
          />
          <Chip 
            icon={<SmartToyIcon />} 
            label="Agentic AI" 
            color="info" 
            variant="outlined"
          />
          <Chip 
            icon={<CloudIcon />} 
            label="AWS Cloud" 
            color="warning" 
            variant="outlined"
          />
          <Chip 
            icon={<AccountTreeIcon />} 
            label="Kubernetes" 
            color="error" 
            variant="outlined"
          />
        </Box>
      </Paper>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Built with ❤️ by Hardik Gothwal
        </Typography>
      </Box>
    </Box>
  );
};

export default Home; 