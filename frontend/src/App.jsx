import React from 'react';
import QueueDashboard from './components/QueueDashboard';
import './index.css';

function App() {
  return (
    <>
      <header className="top-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>QueueMaster</h1>
      </header>
      <QueueDashboard />
    </>
  );
}

export default App;
