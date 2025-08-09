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
  Chip,
  LinearProgress
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  Upload as UploadIcon,
  Psychology as PsychologyIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const MachineLearning: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);
  const [modelType, setModelType] = useState('linear');
  const [targetColumn, setTargetColumn] = useState('');
  const [featureColumns, setFeatureColumns] = useState<string[]>([]);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [modelTrained, setModelTrained] = useState(false);
  const [predictions, setPredictions] = useState<{ actual: number[]; predicted: number[] } | null>(null);
  const [metrics, setMetrics] = useState<{ r2: number; mse: number } | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setUploadedFile(file);
      
      // Simulate CSV parsing
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          const row: Record<string, string> = {};
          headers.forEach((header, index) => {
            row[header.trim()] = values[index]?.trim() || '';
          });
          return row;
        });
        setData(data);
        toast.success('✅ File Uploaded Successfully');
      };
      reader.readAsText(file);
    } else {
      toast.error('Please upload a valid CSV file');
    }
  };

  const handleTrainModel = async () => {
    if (!targetColumn || featureColumns.length === 0) {
      toast.error('Please select target and feature columns');
      return;
    }

    setLoading(true);
    setTrainingProgress(0);

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setModelTrained(true);
          setMetrics({
            r2: 0.85 + Math.random() * 0.1,
            mse: 0.1 + Math.random() * 0.2
          });
          toast.success('✅ Model Trained Successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate predictions
    setTimeout(() => {
      setPredictions({
        actual: [10, 20, 30, 40, 50],
        predicted: [9.5, 19.8, 29.2, 40.1, 49.7]
      });
    }, 2000);
  };

  const handlePredict = () => {
    if (!modelTrained) {
      toast.error('Please train a model first');
      return;
    }

    const newInput = featureColumns.map(col => {
      const avg = data.reduce((sum, row) => sum + parseFloat(row[col] || '0'), 0) / data.length;
      return avg;
    });

    const prediction = newInput.reduce((sum, val) => sum + val, 0) + Math.random() * 10;
    toast.success(`🎯 Predicted ${targetColumn}: ${prediction.toFixed(4)}`);
  };

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        🤖 Machine Learning Playground
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          📂 Upload Dataset
        </Typography>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadIcon />}
          sx={{ mb: 2 }}
        >
          Upload CSV File
          <input
            type="file"
            hidden
            accept=".csv"
            onChange={handleFileUpload}
          />
        </Button>
        {uploadedFile && (
          <Alert severity="success" sx={{ mb: 2 }}>
            File uploaded: {uploadedFile.name}
          </Alert>
        )}
      </Paper>

      {data.length > 0 && (
        <>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              🔍 Select Features & Target
            </Typography>
            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Target Column</InputLabel>
                  <Select
                    value={targetColumn}
                    label="Target Column"
                    onChange={(e) => setTargetColumn(e.target.value)}
                  >
                    {columns.map((col) => (
                      <MenuItem key={col} value={col}>{col}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Model Type</InputLabel>
                  <Select
                    value={modelType}
                    label="Model Type"
                    onChange={(e) => setModelType(e.target.value)}
                  >
                    <MenuItem value="linear">Linear Regression</MenuItem>
                    <MenuItem value="random-forest">Random Forest</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Feature Columns:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {columns.filter(col => col !== targetColumn).map((col) => (
                    <Chip
                      key={col}
                      label={col}
                      onClick={() => {
                        if (featureColumns.includes(col)) {
                          setFeatureColumns(prev => prev.filter(c => c !== col));
                        } else {
                          setFeatureColumns(prev => [...prev, col]);
                        }
                      }}
                      color={featureColumns.includes(col) ? 'primary' : 'default'}
                      variant={featureColumns.includes(col) ? 'filled' : 'outlined'}
                      clickable
                    />
                  ))}
                </Box>
              </Grid>
              <Grid xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleTrainModel}
                  disabled={loading || !targetColumn || featureColumns.length === 0}
                  startIcon={loading ? <CircularProgress size={20} /> : <PsychologyIcon />}
                >
                  {loading ? 'Training...' : '🚀 Train Model'}
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {loading && (
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Training Progress
              </Typography>
              <LinearProgress variant="determinate" value={trainingProgress} sx={{ mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {trainingProgress}% Complete
              </Typography>
            </Paper>
          )}

          {modelTrained && metrics && (
            <>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  📊 Model Performance
                </Typography>
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <Card>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                          R² Score
                        </Typography>
                        <Typography variant="h4" color="primary">
                          {metrics.r2.toFixed(4)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid xs={6}>
                    <Card>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                          MSE
                        </Typography>
                        <Typography variant="h4" color="secondary">
                          {metrics.mse.toFixed(4)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  🔮 Make Predictions
                </Typography>
                <Grid container spacing={2}>
                  {featureColumns.map((col) => (
                    <Grid xs={12} sm={6} md={4} key={col}>
                      <TextField
                        fullWidth
                        label={`${col} value`}
                        type="number"
                        defaultValue={data.reduce((sum, row) => sum + parseFloat(row[col] || '0'), 0) / data.length}
                      />
                    </Grid>
                  ))}
                  <Grid xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handlePredict}
                      startIcon={<AssessmentIcon />}
                    >
                      🔍 Predict Now
                    </Button>
                  </Grid>
                </Grid>
              </Paper>

              {predictions && (
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    📈 Predictions vs Actual
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      Chart visualization would be displayed here
                    </Typography>
                  </Box>
                </Paper>
              )}
            </>
          )}
        </>
      )}

      {data.length === 0 && (
        <Alert severity="info">
          Please upload a CSV file to get started with machine learning.
        </Alert>
      )}
    </Box>
  );
};

export default MachineLearning; 