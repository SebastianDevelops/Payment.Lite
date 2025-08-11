import React, { useState } from 'react';
import { createPayment } from '../api';
import { TextField, Button, Box, Alert, CircularProgress, Paper, Typography } from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(2),
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}));

const FormFields = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: theme.spacing(1),
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,1)',
        },
        '&.Mui-focused': {
            backgroundColor: 'rgba(255,255,255,1)',
        },
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1.5, 3),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
        background: 'linear-gradient(45deg, #FE8B8B 30%, #FFAE53 90%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 10px 2px rgba(255, 105, 135, .3)',
    },
    transition: 'all 0.3s ease',
}));

export default function PaymentForm({ onCreated }) {
    const [customerId, setCustomerId] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!customerId.trim()) {
            return setError('CustomerId is required');
        }
        const amt = parseFloat(amount);
        if (isNaN(amt) || amt <= 0) {
            return setError('Amount must be a positive number');
        }

        setLoading(true);
        try {
            const resp = await createPayment({ customerId: customerId.trim(), amount: amt });
            onCreated(resp.data);
            setCustomerId('');
            setAmount('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer elevation={3}>
            <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                💳 Create New Payment
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormFields>
                    <StyledTextField
                        label="Customer ID"
                        variant="outlined"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        error={!!error && !customerId.trim()}
                        helperText={!!error && !customerId.trim() ? "Customer ID is required" : ""}
                        fullWidth
                    />
                    <StyledTextField
                        label="Amount"
                        variant="outlined"
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        error={!!error && (!parseFloat(amount) || parseFloat(amount) <= 0)}
                        helperText={!!error && (!parseFloat(amount) || parseFloat(amount) <= 0) ? "Amount must be greater than 0" : ""}
                        fullWidth
                    />
                    <StyledButton
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddCardIcon />}
                        size="large"
                    >
                        {loading ? 'Creating...' : 'Create Payment'}
                    </StyledButton>
                </FormFields>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </form>
        </FormContainer>
    );
}