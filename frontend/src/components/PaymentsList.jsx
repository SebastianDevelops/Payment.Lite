import React from 'react';
import { simulateConfirmation } from '../api';

export default function PaymentsList({ payments, onRefresh }) {
    const handleConfirm = async (id) => {
        try {
            await simulateConfirmation(id);
            onRefresh();
            alert('Payment confirmed');
        } catch {
            alert('Failed to confirm');
        }
    };

    if (!payments || payments.length === 0) return <p>No payments found.</p>;

    return (
        <table border="1" cellPadding="8" style={{ width: '100%' }}>
            <thead>
            <tr>
                <th>Id</th>
                <th>CustomerId</th>
                <th>Amount</th>
                <th>Status</th>
                <th>CreatedAt</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {payments.map(p => (
                <tr key={p.id}>
                    <td style={{ fontSize: 12 }}>{p.id}</td>
                    <td>{p.customerId}</td>
                    <td>{p.amount}</td>
                    <td>{p.status}</td>
                    <td>{new Date(p.createdAt).toLocaleString()}</td>
                    <td>
                        {p.status === 'Pending' ? (
                            <button onClick={() => handleConfirm(p.id)}>Confirm</button>
                        ) : (
                            '—'
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}