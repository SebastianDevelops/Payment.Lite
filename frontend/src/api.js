import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchPayments = () => axios.get(`${API_BASE}/payments`);
export const createPayment = (payload) => axios.post(`${API_BASE}/payments`, payload);
export const simulateConfirmation = (id) => axios.post(`${API_BASE}/simulate-confirmation/${id}`);