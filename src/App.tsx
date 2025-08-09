import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  Code as CodeIcon,
  Web as WebIcon,
  Psychology as PsychologyIcon,
  Chat as ChatIcon,
  Terminal as TerminalIcon,
  Storage as StorageIcon,
  Cloud as CloudIcon,
  AccountTree as AccountTreeIcon,
  SmartToy as SmartToyIcon,
  Folder as FolderIcon,
  Computer as ComputerIcon,
  Menu as MenuIcon,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';

// Import components
import Home from './components/Home';
import Python from './components/Python';
import HtmlJs from './components/HtmlJs';
import MachineLearning from './components/MachineLearning';
import Prompt from './components/Prompt';
import Linux from './components/Linux';
import Docker from './components/Docker';
import AWS from './components/AWS';
import Kubernetes from './components/Kubernetes';
import AgenticAI from './components/AgenticAI';
import Files from './components/Files';
import Windows from './components/Windows';

const drawerWidth = 280;

const menuItems = [
  { text: '🏠Home', icon: <HomeIcon />, path: '/' },
  { text: '🐍Python', icon: <CodeIcon />, path: '/python' },
  { text: '🧙‍♂️HTML/JS', icon: <WebIcon />, path: '/htmljs' },
  { text: '🧠 ML', icon: <PsychologyIcon />, path: '/ml' },
  { text: '🎯 Prompt', icon: <ChatIcon />, path: '/prompt' },
  { text: '🐧Linux', icon: <TerminalIcon />, path: '/linux' },
  { text: '🐳 Docker', icon: <StorageIcon />, path: '/docker' },
  { text: '☁️AWS', icon: <CloudIcon />, path: '/aws' },
  { text: '🪄 Kubernetes', icon: <AccountTreeIcon />, path: '/kubernetes' },
  { text: '🧞Agentic-Ai', icon: <SmartToyIcon />, path: '/agentic-ai' },
  { text: '📁 Files', icon: <FolderIcon />, path: '/files' },
  { text: '🪟 Windows', icon: <ComputerIcon />, path: '/windows' },
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const drawer = (
    <div>
      <Toolbar>
        <img 
          src="https://img.freepik.com/premium-photo/techno-fashion-future-futuristic-technology-artificial-intelligence_173948-10290.jpg" 
          alt="Logo" 
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </Toolbar>
      <Divider />
      <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
        Creator Menu
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                MenuBase - Multiple Things On Single Platform
              </Typography>
              <IconButton color="inherit" onClick={toggleColorMode}>
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Toolbar>
          </AppBar>
          
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              mt: 8
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/python" element={<Python />} />
              <Route path="/htmljs" element={<HtmlJs />} />
              <Route path="/ml" element={<MachineLearning />} />
              <Route path="/prompt" element={<Prompt />} />
              <Route path="/linux" element={<Linux />} />
              <Route path="/docker" element={<Docker />} />
              <Route path="/aws" element={<AWS />} />
              <Route path="/kubernetes" element={<Kubernetes />} />
              <Route path="/agentic-ai" element={<AgenticAI />} />
              <Route path="/files" element={<Files />} />
              <Route path="/windows" element={<Windows />} />
            </Routes>
          </Box>
        </Box>
        <Toaster position="top-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
