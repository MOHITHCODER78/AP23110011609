import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Home from './pages/Home';

// Clean and simple theme
const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
    }
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;

