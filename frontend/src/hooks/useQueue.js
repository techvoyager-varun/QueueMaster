import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function useQueue() {
  const [queue, setQueue] = useState([]);

  const fetchQueue = async () => {
    try {
      const res = await fetch(`${API_URL}/customers`);
      const data = await res.json();
      setQueue(data);
    } catch (err) {
      console.error('Failed to fetch queue:', err);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  const addCustomer = async (name, note) => {
    try {
      await fetch(`${API_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, note })
      });
      fetchQueue();
    } catch (err) {
      console.error('Failed to add customer', err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/customers/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchQueue();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const removeCustomer = async (id) => {
    try {
      await fetch(`${API_URL}/customers/${id}`, { method: 'DELETE' });
      fetchQueue();
    } catch (err) {
      console.error('Failed to remove customer', err);
    }
  };

  return {
    queue,
    addCustomer,
    updateStatus,
    removeCustomer
  };
}
