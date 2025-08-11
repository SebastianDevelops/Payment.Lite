import React, { useEffect, useState } from 'react';
import { fetchPayments } from './api';
import PaymentsList from './components/PaymentsList';
import PaymentForm from './components/PaymentForm';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Container, 
  Typography, 
  Box, 
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetchPayments();
      setPayments(resp.data);
    } catch (err) {
      console.error('Failed to fetch payments:', err);
      setError('Failed to fetch payments. Please check if the API is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  useEffect(() => { load(); }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center" mb={4}>
          <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={1}>
            <AccountBalanceIcon sx={{ fontSize: 40 }} color="primary" />
            <Typography variant="h3" component="h1" color="primary">
              Payment Orchestrator
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary">
            Manage your payments with ease
          </Typography>
        </Box>
        
        <PaymentForm onCreated={load} />
        
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <CircularProgress size={40} />
            <Typography variant="body1" sx={{ ml: 2 }}>Loading payments...</Typography>
          </Box>
        ) : (
          <PaymentsList payments={payments} onRefresh={load} />
        )}
        
        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;