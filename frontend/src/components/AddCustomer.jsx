import React, { useState } from 'react';

export default function AddCustomer({ onAdd }) {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name, note);
      setName('');
      setNote('');
    }
  };

  return (
    <div className="form-card">
      <div className="form-header mono">
        ADD TO QUEUE
      </div>
      <form className="form-body" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="mono">CUSTOMER NAME <span className="req">*</span></label>
          <input 
            type="text" 
            placeholder="e.g. Varun Rawat" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="mono">NOTE (OPTIONAL)</label>
          <input 
            type="text" 
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn mono">
          ADD CUSTOMER &rarr;
        </button>
      </form>
    </div>
  );
}
