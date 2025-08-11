import React, { useState } from 'react';
import { createPayment } from '../api';

export default function PaymentForm({ onCreated }) {
    const [customerId, setCustomerId] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!customerId.trim()) return setError('CustomerId is required');
        const amt = parseFloat(amount);
        if (!amt || amt <= 0) return setError('Amount must be greater than 0');

        setLoading(true);
        try {
            const resp = await createPayment({ customerId: customerId.trim(), amount: amt });
            onCreated(resp.data);
            setCustomerId('');
            setAmount('');
        } catch (err) {
            setError(err.response?.data || 'Failed to create payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <div>
                <label>CustomerId</label>
                <input value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
            </div>
            <div>
                <label>Amount</label>
                <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Payment'}</button>
        </form>
    );
}