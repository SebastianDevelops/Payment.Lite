import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
    Chip,
    Box
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';
import HistoryIcon from '@mui/icons-material/History';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PaymentIcon from '@mui/icons-material/Payment';
import { styled } from '@mui/material/styles';
import { simulateConfirmation } from '../api';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    overflow: 'hidden',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    '& .MuiTableCell-head': {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.9rem',
            padding: '12px 8px',
        },
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: '1rem',
    padding: '16px',
    borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
        padding: '12px 8px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
    },
    '&:hover': {
        backgroundColor: 'rgba(103, 126, 234, 0.08)',
        transform: 'scale(1.01)',
        transition: 'all 0.2s ease',
    },
}));

const ResponsiveText = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.spacing(3),
    textTransform: 'none',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)',
    },
    transition: 'all 0.3s ease',
}));

const HeaderBox = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    textAlign: 'center',
}));

export default function PaymentsList({ payments, onRefresh }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleConfirm = async (id) => {
        try {
            await simulateConfirmation(id);
            onRefresh();
            alert('Payment confirmed');
        } catch {
            alert('Failed to confirm');
        }
    };

    if (!payments || payments.length === 0) {
        return (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1}>
                    <PaymentIcon sx={{ fontSize: 24 }} color="disabled" />
                    <Typography variant="h6" color="text.secondary">
                        No payments found
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Create your first payment using the form above
                </Typography>
            </Paper>
        );
    }

    return (
        <Box>
            <HeaderBox>
                <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1}>
                    <HistoryIcon sx={{ fontSize: 32 }} color="primary" />
                    <Typography variant="h4" component="h2" fontWeight="bold" color="primary">
                        Payment History
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <ManageAccountsIcon color="action" />
                    <Typography variant="body1" color="text.secondary">
                        Manage and track all your payments
                    </Typography>
                </Box>
            </HeaderBox>
            <StyledTableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="payments table">
                    <StyledTableHead>
                        <TableRow>
                            <TableCell>Payment ID</TableCell>
                            <TableCell>Customer ID</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {payments.map((p) => (
                            <StyledTableRow key={p.id}>
                                <StyledTableCell component="th" scope="row">
                                    <ResponsiveText sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                        {p.id.substring(0, 8)}...
                                    </ResponsiveText>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography fontWeight="medium">{p.customerId}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography fontWeight="bold" color="primary">
                                        R{p.amount}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Chip
                                        icon={p.status === 'Pending' ? <PendingIcon /> : <CheckCircleOutlineIcon />}
                                        label={p.status}
                                        color={p.status === 'Pending' ? 'warning' : 'success'}
                                        variant={p.status === 'Pending' ? 'outlined' : 'filled'}
                                        size="small"
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(p.createdAt).toLocaleString()}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {p.status === 'Pending' ? (
                                        <StyledButton
                                            variant="contained"
                                            color="success"
                                            size={isMobile ? 'small' : 'medium'}
                                            startIcon={<CheckCircleOutlineIcon />}
                                            onClick={() => handleConfirm(p.id)}
                                        >
                                            {isMobile ? 'Confirm' : 'Confirm Payment'}
                                        </StyledButton>
                                    ) : (
                                        <Chip label="Completed" color="success" size="small" />
                                    )}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </Box>
    );
}