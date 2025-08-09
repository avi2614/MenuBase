import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Alert,
  CircularProgress,
  Slider
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  Send as SendIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const Prompt: React.FC = () => {
  const [modelChoice, setModelChoice] = useState('gemini');
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const promptTemplates = [
    {
      title: '✍ Resume Builder',
      prompt: 'Create a professional resume for a Computer Science student with skills in Python, Machine Learning, and Web Development.'
    },
    {
      title: '📧 Email Generator',
      prompt: 'Write a formal email to your professor requesting an extension for the assignment deadline due to medical issues.'
    },
    {
      title: '🧠 Code Explainer',
      prompt: 'Explain this Python code in simple terms: def fibonacci(n): return 1 if n <= 2 else fibonacci(n-1) + fibonacci(n-2)'
    },
    {
      title: '💼 Startup Idea Generator',
      prompt: 'Give me 3 unique startup ideas for solving mental health problems using AI.'
    },
    {
      title: '📣 Marketing Copy Writer',
      prompt: 'Write a catchy product description for a smartwatch that tracks stress, heart rate, and sleep quality.'
    },
    {
      title: '🗣 Interview Q&A Generator',
      prompt: 'Generate 5 interview questions and model answers for a web developer role.'
    }
  ];

  const handleTemplateSelect = (template: string) => {
    setPrompt(template);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    setResponse('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your request, here's a comprehensive analysis...",
        "I'll help you with that. Here's what I found...",
        "Let me provide you with a detailed response...",
        "Here's my analysis of your question...",
        "I understand your request. Here's my recommendation..."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setResponse(randomResponse + " " + prompt + " - This is a simulated response. In a real application, this would be the actual AI response based on your prompt and the selected model.");
      setLoading(false);
      toast.success('✅ Response generated successfully!');
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    toast.success('Response copied to clipboard!');
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        🎯 Prompt Engineering Playground
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Try out your best prompts or select from common prompt templates below.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          🤖 Choose Model
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Model</InputLabel>
          <Select
            value={modelChoice}
            label="Model"
            onChange={(e) => setModelChoice(e.target.value)}
          >
            <MenuItem value="gemini">Gemini 1.5</MenuItem>
            <MenuItem value="gpt">GPT-4.5</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          🎛 Creativity Level (temperature)
        </Typography>
        <Slider
          value={temperature}
          onChange={(_, value) => setTemperature(value as number)}
          min={0}
          max={1}
          step={0.1}
          marks={[
            { value: 0, label: 'Focused' },
            { value: 0.5, label: 'Balanced' },
            { value: 1, label: 'Creative' }
          ]}
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary">
          Current temperature: {temperature}
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          📚 Prompt Templates
        </Typography>
        <Grid container spacing={2}>
          {promptTemplates.map((template, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <Card 
                elevation={2}
                sx={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
                onClick={() => handleTemplateSelect(template.prompt)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {template.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {template.prompt}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          🧠 Your Prompt
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          label="Write your prompt here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !prompt.trim()}
          startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
        >
          {loading ? 'Generating...' : '🔍 Run Prompt'}
        </Button>
      </Paper>

      {response && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              🤖 AI Response
            </Typography>
            <Button
              startIcon={<CopyIcon />}
              onClick={copyToClipboard}
              variant="outlined"
              size="small"
            >
              Copy
            </Button>
          </Box>
          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {response}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      )}

      {!prompt && !response && (
        <Alert severity="info">
          Select a prompt template or write your own prompt to get started.
        </Alert>
      )}
    </Box>
  );
};

export default Prompt; 