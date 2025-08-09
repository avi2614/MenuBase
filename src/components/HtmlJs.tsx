import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  Calculate as CalculateIcon,
  CameraAlt as CameraIcon,
  Email as EmailIcon,
  DarkMode as DarkModeIcon,
  LocationOn as LocationIcon,
  WhatsApp as WhatsAppIcon,
  VolumeUp as VolumeIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const HtmlJs: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const htmlTools = [
    {
      id: 'calculator',
      name: 'Calculate Age',
      icon: <CalculateIcon />,
      description: 'Simple age calculator tool',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Age Calculator</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            input, button { margin: 10px; padding: 8px; }
            #result { font-weight: bold; color: #1976d2; }
          </style>
        </head>
        <body>
          <h2>Age Calculator</h2>
          <input type="date" id="birthdate">
          <button onclick="calculateAge()">Calculate Age</button>
          <p id="result"></p>
          <script>
            function calculateAge() {
              const birthdate = new Date(document.getElementById('birthdate').value);
              const today = new Date();
              const age = today.getFullYear() - birthdate.getFullYear();
              const monthDiff = today.getMonth() - birthdate.getMonth();
              if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
                age--;
              }
              document.getElementById('result').textContent = 'Age: ' + age + ' years';
            }
          </script>
        </body>
        </html>
      `
    },
    {
      id: 'camera',
      name: 'Open Camera',
      icon: <CameraIcon />,
      description: 'Camera capture and photo download',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Camera App</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            button { margin: 10px; padding: 10px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer; }
            button:hover { background: #1565c0; }
            #video { border: 2px solid #ccc; border-radius: 8px; }
          </style>
        </head>
        <body>
          <h2>Camera View</h2>
          <video id="video" autoplay width="320" height="240"></video><br>
          <button onclick="capturePhoto()">Capture</button>
          <button onclick="stopCamera()">Stop Camera</button>
          <canvas id="canvas" width="320" height="240" style="display:none;"></canvas>
          <a id="downloadLink" style="display:none;">Download</a>
          <script>
            let stream = null;
            navigator.mediaDevices.getUserMedia({ video: true })
              .then(mediaStream => {
                stream = mediaStream;
                document.getElementById('video').srcObject = stream;
              })
              .catch(err => console.error("Camera error:", err));
            
            function capturePhoto() {
              const video = document.getElementById('video');
              const canvas = document.getElementById('canvas');
              const ctx = canvas.getContext('2d');
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageData = canvas.toDataURL('image/png');
              const link = document.getElementById('downloadLink');
              link.href = imageData;
              link.download = 'captured.png';
              link.click();
            }
            
            function stopCamera() {
              if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                document.getElementById('video').srcObject = null;
              }
            }
          </script>
        </body>
        </html>
      `
    },
    {
      id: 'email',
      name: 'Send Email',
      icon: <EmailIcon />,
      description: 'Email composition and sending',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Email Sender</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            input, textarea { width: 100%; margin: 10px 0; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
            button { padding: 10px 20px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer; }
            button:hover { background: #1565c0; }
          </style>
        </head>
        <body>
          <h2>Send Email</h2>
          <input type="email" id="to" placeholder="To:">
          <input type="text" id="subject" placeholder="Subject:">
          <textarea id="message" rows="6" placeholder="Message:"></textarea>
          <button onclick="sendEmail()">Send Email</button>
          <p id="status"></p>
          <script>
            function sendEmail() {
              const to = document.getElementById('to').value;
              const subject = document.getElementById('subject').value;
              const message = document.getElementById('message').value;
              
              if (!to || !subject || !message) {
                document.getElementById('status').textContent = 'Please fill all fields';
                return;
              }
              
              // Simulate email sending
              document.getElementById('status').textContent = 'Email sent successfully!';
              document.getElementById('to').value = '';
              document.getElementById('subject').value = '';
              document.getElementById('message').value = '';
            }
          </script>
        </body>
        </html>
      `
    },
    {
      id: 'darkmode',
      name: 'Dark Mode Switch',
      icon: <DarkModeIcon />,
      description: 'Toggle between light and dark themes',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Dark Mode Toggle</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; transition: all 0.3s; }
            .dark { background: #333; color: white; }
            button { padding: 10px 20px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer; }
            button:hover { background: #1565c0; }
          </style>
        </head>
        <body>
          <h2>Dark Mode Toggle</h2>
          <button onclick="toggleDarkMode()">Toggle Dark Mode</button>
          <p>Click the button to switch between light and dark themes.</p>
          <script>
            function toggleDarkMode() {
              document.body.classList.toggle('dark');
            }
          </script>
        </body>
        </html>
      `
    },
    {
      id: 'gps',
      name: 'GPS Location',
      icon: <LocationIcon />,
      description: 'Get current GPS coordinates',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>GPS Location</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            button { padding: 10px 20px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer; }
            button:hover { background: #1565c0; }
            #location { margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px; }
          </style>
        </head>
        <body>
          <h2>GPS Location</h2>
          <button onclick="getLocation()">Get My Location</button>
          <div id="location"></div>
          <script>
            function getLocation() {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
              } else {
                document.getElementById('location').innerHTML = "Geolocation is not supported by this browser.";
              }
            }
            
            function showPosition(position) {
              document.getElementById('location').innerHTML = 
                "Latitude: " + position.coords.latitude + 
                "<br>Longitude: " + position.coords.longitude;
            }
            
            function showError(error) {
              switch(error.code) {
                case error.PERMISSION_DENIED:
                  document.getElementById('location').innerHTML = "User denied the request for Geolocation."
                  break;
                case error.POSITION_UNAVAILABLE:
                  document.getElementById('location').innerHTML = "Location information is unavailable."
                  break;
                case error.TIMEOUT:
                  document.getElementById('location').innerHTML = "The request to get user location timed out."
                  break;
                case error.UNKNOWN_ERROR:
                  document.getElementById('location').innerHTML = "An unknown error occurred."
                  break;
              }
            }
          </script>
        </body>
        </html>
      `
    },
    {
      id: 'whatsapp',
      name: 'Send WhatsApp Message',
      icon: <WhatsAppIcon />,
      description: 'WhatsApp message composition',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>WhatsApp Sender</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            input, textarea { width: 100%; margin: 10px 0; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
            button { padding: 10px 20px; background: #25D366; color: white; border: none; border-radius: 4px; cursor: pointer; }
            button:hover { background: #128C7E; }
          </style>
        </head>
        <body>
          <h2>Send WhatsApp Message</h2>
          <input type="tel" id="phone" placeholder="Phone number (with country code)">
          <textarea id="message" rows="4" placeholder="Message:"></textarea>
          <button onclick="sendWhatsApp()">Send WhatsApp</button>
          <p id="status"></p>
          <script>
            function sendWhatsApp() {
              const phone = document.getElementById('phone').value;
              const message = document.getElementById('message').value;
              
              if (!phone || !message) {
                document.getElementById('status').textContent = 'Please fill all fields';
                return;
              }
              
              const url = 'https://wa.me/' + phone.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(message);
              window.open(url, '_blank');
              document.getElementById('status').textContent = 'Opening WhatsApp...';
            }
          </script>
        </body>
        </html>
      `
    },
    {
      id: 'speak',
      name: 'Speak My Text',
      icon: <VolumeIcon />,
      description: 'Text to speech conversion',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Text to Speech</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            textarea { width: 100%; margin: 10px 0; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
            button { padding: 10px 20px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 5px; }
            button:hover { background: #1565c0; }
            button:disabled { background: #ccc; cursor: not-allowed; }
          </style>
        </head>
        <body>
          <h2>Text to Speech</h2>
          <textarea id="text" rows="4" placeholder="Enter text to speak:"></textarea>
          <button onclick="speak()">Speak</button>
          <button onclick="stop()">Stop</button>
          <p id="status"></p>
          <script>
            let speech = null;
            
            function speak() {
              const text = document.getElementById('text').value;
              if (!text) {
                document.getElementById('status').textContent = 'Please enter some text';
                return;
              }
              
              if ('speechSynthesis' in window) {
                speech = new SpeechSynthesisUtterance(text);
                speech.rate = 1;
                speech.pitch = 1;
                speech.volume = 1;
                speech.lang = 'en-US';
                
                speech.onstart = function() {
                  document.getElementById('status').textContent = 'Speaking...';
                };
                
                speech.onend = function() {
                  document.getElementById('status').textContent = 'Finished speaking';
                };
                
                speechSynthesis.speak(speech);
              } else {
                document.getElementById('status').textContent = 'Speech synthesis not supported';
              }
            }
            
            function stop() {
              if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
                document.getElementById('status').textContent = 'Stopped speaking';
              }
            }
          </script>
        </body>
        </html>
      `
    }
  ];

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTool(null);
  };

  const getSelectedToolContent = () => {
    const tool = htmlTools.find(t => t.id === selectedTool);
    return tool?.htmlContent || '';
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        🌐 HTML/JS Integration
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Launch your browser-based utilities and tools.
      </Typography>

      <Grid container spacing={3}>
        {htmlTools.map((tool) => (
          <Grid item xs={12} sm={6} md={4} key={tool.id}>
            <Card 
              elevation={2}
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
              onClick={() => handleToolSelect(tool.id)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ mr: 2, color: 'primary.main' }}>
                    {tool.icon}
                  </Box>
                  <Typography variant="h6" component="h3">
                    {tool.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {tool.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { height: '80vh' }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {htmlTools.find(t => t.id === selectedTool)?.name}
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <iframe
            srcDoc={getSelectedToolContent()}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px'
            }}
            title="HTML Tool"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HtmlJs; 