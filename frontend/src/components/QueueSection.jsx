import React from 'react';
import CustomerCard from './CustomerCard';

export default function QueueSection({ 
  title, 
  count, 
  meta, 
  emptyMsg, 
  data, 
  onUpdateStatus, 
  onRemove, 
  showIndex, 
  noBorder, 
  marginTop, 
  marginBottom 
}) {
  return (
    <>
      <div 
        className={`section-header ${noBorder ? 'no-border' : ''}`} 
        style={marginTop ? { marginTop } : {}}
      >
        <h2>{title}</h2>
        <span className="count mono">({count})</span>
        {meta && <span className="section-meta mono">{meta}</span>}
      </div>
      <div 
        className="queue-list" 
        style={marginBottom ? { marginBottom } : {}}
      >
        {data.length === 0 && <div className="empty-state">{emptyMsg}</div>}
        {data.map((c, idx) => (
          <CustomerCard 
            key={c.id} 
            customer={c} 
            index={showIndex ? idx + 1 : undefined} 
            onUpdateStatus={onUpdateStatus} 
            onRemove={onRemove} 
          />
        ))}
      </div>
    </>
  );
}
