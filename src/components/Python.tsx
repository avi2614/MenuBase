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
  Divider
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  Instagram as InstagramIcon,
  Phone as PhoneIcon,
  Psychology as PsychologyIcon,
  Language as LanguageIcon,
  Send as SendIcon
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const Python: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // WhatsApp state
  const [whatsappData, setWhatsappData] = useState({
    mobile: '',
    message: '',
    hour: new Date().getHours(),
    minute: (new Date().getMinutes() + 2) % 60
  });

  // Email state
  const [emailData, setEmailData] = useState({
    receiver: '',
    subject: '',
    message: ''
  });

  // Instagram state
  const [instagramData, setInstagramData] = useState({
    username: '',
    password: '',
    imagePath: '',
    caption: ''
  });

  // Call state
  const [callData, setCallData] = useState({
    phoneNumber: ''
  });

  // Gemini state
  const [geminiData, setGeminiData] = useState({
    prompt: ''
  });

  // Scrape state
  const [scrapeData, setScrapeData] = useState({
    url: '',
    tag: ''
  });

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleWhatsApp = async () => {
    if (!whatsappData.mobile || !whatsappData.message) {
      toast.error('Please fill all fields');
      return;
    }
    
    setLoading(true);
    addLog('WhatsApp message scheduled');
    
    // Simulate API call
    setTimeout(() => {
      toast.success('✅ WhatsApp Message Scheduled');
      setLoading(false);
    }, 2000);
  };

  const handleEmail = async () => {
    if (!emailData.receiver || !emailData.subject || !emailData.message) {
      toast.error('Please fill all fields');
      return;
    }
    
    setLoading(true);
    addLog('Email sent');
    
    // Simulate API call
    setTimeout(() => {
      toast.success('✅ Email sent successfully!');
      setLoading(false);
    }, 2000);
  };

  const handleInstagram = async () => {
    if (!instagramData.username || !instagramData.password || !instagramData.imagePath || !instagramData.caption) {
      toast.error('Please fill all fields');
      return;
    }
    
    setLoading(true);
    addLog('Instagram post uploaded');
    
    // Simulate API call
    setTimeout(() => {
      toast.success('✅ Instagram Post Uploaded Successfully!');
      setLoading(false);
    }, 2000);
  };

  const handleCall = async () => {
    if (!callData.phoneNumber) {
      toast.error('Please enter a phone number');
      return;
    }
    
    setLoading(true);
    addLog('Call initiated');
    
    // Simulate API call
    setTimeout(() => {
      toast.success('✅ Call initiated successfully!');
      setLoading(false);
    }, 2000);
  };

  const handleGemini = async () => {
    if (!geminiData.prompt) {
      toast.error('Please enter a prompt');
      return;
    }
    
    setLoading(true);
    addLog('Gemini AI query');
    
    // Simulate API call
    setTimeout(() => {
      toast.success('✅ Gemini response generated');
      setLoading(false);
    }, 2000);
  };

  const handleScrape = async () => {
    if (!scrapeData.url || !scrapeData.tag) {
      toast.error('Please fill all fields');
      return;
    }
    
    setLoading(true);
    addLog('Website scraped');
    
    // Simulate API call
    setTimeout(() => {
      toast.success('✅ Content scraped successfully');
      setLoading(false);
    }, 2000);
  };

  const exportLogs = () => {
    const logText = logs.join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'smartops_logs.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Logs exported successfully');
  };

  const tasks = [
    { value: 'whatsapp', label: 'Send WhatsApp Message', icon: <WhatsAppIcon /> },
    { value: 'email', label: 'Send Email', icon: <EmailIcon /> },
    { value: 'instagram', label: 'Post to Instagram', icon: <InstagramIcon /> },
    { value: 'call', label: 'Make a Call', icon: <PhoneIcon /> },
    { value: 'gemini', label: 'Ask Gemini AI', icon: <PsychologyIcon /> },
    { value: 'scrape', label: 'Scrape Website', icon: <LanguageIcon /> }
  ];

  const renderTaskForm = () => {
    switch (selectedTask) {
      case 'whatsapp':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <WhatsAppIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Send WhatsApp Message
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    value={whatsappData.mobile}
                    onChange={(e) => setWhatsappData(prev => ({ ...prev, mobile: e.target.value }))}
                    placeholder="e.g., +919876543210"
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Message"
                    value={whatsappData.message}
                    onChange={(e) => setWhatsappData(prev => ({ ...prev, message: e.target.value }))}
                  />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Hour (24h format)"
                    value={whatsappData.hour}
                    onChange={(e) => setWhatsappData(prev => ({ ...prev, hour: parseInt(e.target.value) }))}
                    inputProps={{ min: 0, max: 23 }}
                  />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Minute"
                    value={whatsappData.minute}
                    onChange={(e) => setWhatsappData(prev => ({ ...prev, minute: parseInt(e.target.value) }))}
                    inputProps={{ min: 0, max: 59 }}
                  />
                </Grid>
                <Grid xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleWhatsApp}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                  >
                    {loading ? 'Scheduling...' : 'Send WhatsApp'}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 'email':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <EmailIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Send Email
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    label="Receiver's Email"
                    value={emailData.receiver}
                    onChange={(e) => setEmailData(prev => ({ ...prev, receiver: e.target.value }))}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    value={emailData.subject}
                    onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Message"
                    value={emailData.message}
                    onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                  />
                </Grid>
                <Grid xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleEmail}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                  >
                    {loading ? 'Sending...' : 'Send Email'}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 'instagram':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <InstagramIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Post to Instagram
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Instagram Username"
                    value={instagramData.username}
                    onChange={(e) => setInstagramData(prev => ({ ...prev, username: e.target.value }))}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Instagram Password"
                    value={instagramData.password}
                    onChange={(e) => setInstagramData(prev => ({ ...prev, password: e.target.value }))}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    label="Image Path"
                    value={instagramData.imagePath}
                    onChange={(e) => setInstagramData(prev => ({ ...prev, imagePath: e.target.value }))}
                    placeholder="Full path to image (.jpg/.png)"
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Caption"
                    value={instagramData.caption}
                    onChange={(e) => setInstagramData(prev => ({ ...prev, caption: e.target.value }))}
                  />
                </Grid>
                <Grid xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleInstagram}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                  >
                    {loading ? 'Posting...' : 'Post to Instagram'}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 'call':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <PhoneIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Make a Call
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={callData.phoneNumber}
                    onChange={(e) => setCallData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    placeholder="e.g., +919876543210"
                  />
                </Grid>
                <Grid xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleCall}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <PhoneIcon />}
                  >
                    {loading ? 'Calling...' : 'Make Call'}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 'gemini':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <PsychologyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Ask Gemini AI
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Ask Gemini anything"
                    value={geminiData.prompt}
                    onChange={(e) => setGeminiData(prev => ({ ...prev, prompt: e.target.value }))}
                  />
                </Grid>
                <Grid xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleGemini}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <PsychologyIcon />}
                  >
                    {loading ? 'Asking...' : 'Ask Gemini'}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 'scrape':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <LanguageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Scrape Website
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    label="Website URL"
                    value={scrapeData.url}
                    onChange={(e) => setScrapeData(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://example.com"
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    label="HTML Tag"
                    value={scrapeData.tag}
                    onChange={(e) => setScrapeData(prev => ({ ...prev, tag: e.target.value }))}
                    placeholder="e.g., h1, p, div"
                  />
                </Grid>
                <Grid xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleScrape}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <LanguageIcon />}
                  >
                    {loading ? 'Scraping...' : 'Scrape Content'}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Alert severity="info">
            Please select a task from the dropdown above to get started.
          </Alert>
        );
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        🐍 Python : Your Digital Work
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Choose a task</InputLabel>
          <Select
            value={selectedTask}
            label="Choose a task"
            onChange={(e) => setSelectedTask(e.target.value)}
          >
            {tasks.map((task) => (
              <MenuItem key={task.value} value={task.value}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {task.icon}
                  <Typography sx={{ ml: 1 }}>{task.label}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {renderTaskForm()}

      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            📜 Activity Logs
          </Typography>
          <Button
            variant="outlined"
            onClick={exportLogs}
            disabled={logs.length === 0}
          >
            Export Logs
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
          {logs.length === 0 ? (
            <Typography color="text.secondary">No logs yet</Typography>
          ) : (
            logs.map((log, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 1, fontFamily: 'monospace' }}>
                {log}
              </Typography>
            ))
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Python; 