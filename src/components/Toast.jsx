import React from 'react';

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          <i className="fa-solid fa-circle-check text-success"></i>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
