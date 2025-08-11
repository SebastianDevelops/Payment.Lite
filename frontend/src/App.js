import React, { useEffect, useState } from 'react';
import { fetchPayments } from './api';
import PaymentsList from './components/PaymentsList';
import PaymentForm from './components/PaymentForm';

function App() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const resp = await fetchPayments();
      setPayments(resp.data);
    } catch {
      alert('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
      <div style={{ padding: 20 }}>
        <h1>Payments</h1>
        <PaymentForm onCreated={load} />
        {loading ? <div>Loading...</div> : <PaymentsList payments={payments} onRefresh={load} />}
      </div>
  );
}

export default App;