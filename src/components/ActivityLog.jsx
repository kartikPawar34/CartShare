import React from 'react';

export default function ActivityLog({ logs }) {
  return (
    <div className="dashboard-card">
      <h3 className="card-title">Activity Log</h3>
      <div className="log-terminal">
        {logs.length === 0 ? (
          <p className="empty-msg">No recent history.</p>
        ) : (
          logs.map((log, index) => (
            <p key={index} className="log-row">{log}</p>
          ))
        )}
      </div>
    </div>
  );
}