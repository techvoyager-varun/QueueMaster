import React from 'react';
import AddCustomer from './AddCustomer';
import QueueSection from './QueueSection';
import useQueue from '../hooks/useQueue';

export default function QueueDashboard() {
  const { queue, addCustomer, updateStatus, removeCustomer } = useQueue();

  const waiting = queue.filter(c => c.status === 'WAITING');
  const serving = queue.filter(c => c.status === 'SERVING');
  const completed = queue.filter(c => c.status === 'COMPLETED');

  return (
    <div className="main-container">
      <div className="col-left">
        <AddCustomer onAdd={addCustomer} />
        
        <QueueSection
          title="Recently completed"
          count={completed.length}
          data={completed}
          emptyMsg="No customers completed yet"
          onUpdateStatus={updateStatus}
          onRemove={removeCustomer}
          noBorder={true}
          marginTop="3rem"
        />
      </div>

      <div className="col-right">
        <QueueSection
          title="Waiting line"
          count={waiting.length}
          meta="FIFO ORDER"
          data={waiting}
          emptyMsg="No customers waiting"
          onUpdateStatus={updateStatus}
          onRemove={removeCustomer}
          showIndex={true}
          marginBottom="4rem"
        />

        <QueueSection
          title="Now serving"
          count={serving.length}
          data={serving}
          emptyMsg="No one is currently being served"
          onUpdateStatus={updateStatus}
          onRemove={removeCustomer}
        />
      </div>
    </div>
  );
}
