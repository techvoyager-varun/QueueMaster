import React, { useEffect, useState } from 'react';

export default function CustomerCard({ customer, index, onUpdateStatus, onRemove }) {
  const [waitedMins, setWaitedMins] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const created = new Date(customer.createdAt);
      const now = new Date();
      const diffMs = now - created;
      const mins = Math.floor(diffMs / 60000);
      setWaitedMins(mins);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [customer.createdAt]);

  if (customer.status === 'WAITING') {
    return (
      <div className="waiting-card">
        <div className="waiting-details">
          <div className="waiting-name-row">
            <span className="waiting-name">{customer.name}</span>
            <span className="tag-waiting mono">WAITING</span>
          </div>
          <div className="waiting-meta mono">
            {customer.note && <span>{customer.note} &bull;</span>} <span>WAITED {waitedMins}M</span>
          </div>
        </div>
        <div className="waiting-actions">
          <button className="btn-outline mono" onClick={() => onUpdateStatus(customer.id, 'SERVING')}>CALL IN</button>
          <button className="btn-outline mono" onClick={() => onRemove(customer.id)}>X</button>
        </div>
      </div>
    );
  }

  if (customer.status === 'SERVING') {
    return (
      <div className="serving-card">
        <div className="serving-header">
          <span className="tag-serving mono">BEING SERVED</span>
          <span className="serving-time mono">{waitedMins}M IN PREMISES</span>
        </div>
        <div className="serving-body">
          <div className="serving-name">{customer.name}</div>
          <div className="serving-note">{customer.note || 'No notes provided'}</div>
          <div className="serving-actions">
            <button className="btn-black mono" onClick={() => onUpdateStatus(customer.id, 'COMPLETED')}>MARK COMPLETED</button>
            <button className="btn-white mono" onClick={() => onRemove(customer.id)}>REMOVE</button>
          </div>
        </div>
      </div>
    );
  }

  if (customer.status === 'COMPLETED') {
    return (
      <div className="completed-card">
        <div className="completed-info">
          <span className="completed-label mono">DONE</span>
          <span className="completed-name">{customer.name}</span>
        </div>
        <button className="btn-text mono" onClick={() => onRemove(customer.id)}>CLEAR</button>
      </div>
    );
  }

  return null;
}
