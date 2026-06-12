import React from 'react';

export default function Receipt({ cart, room, total }) {
  const splits = cart.reduce((acc, item) => {
    acc[item.addedBy] = (acc[item.addedBy] || 0) + item.price;
    return acc;
  }, {});

  return (
    <div style={{ fontFamily: 'monospace', color: 'black' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2>CARTSHARE RECEIPT</h2>
        <p>Room Identifier: {room}</p>
        <p style={{ fontSize: '0.75rem', color: '#666' }}>Date: {new Date().toLocaleString()}</p>
      </div>

      <div style={{ borderBottom: '2px dashed black', paddingBottom: '1rem', marginBottom: '1rem' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>ITEMS BREAKDOWN</h4>
        {cart.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span>{item.name} ({item.addedBy})</span>
            <span>${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div style={{ borderBottom: '2px dashed black', paddingBottom: '1rem', marginBottom: '1rem' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>FINAL EXPENSE SPLITS</h4>
        {Object.entries(splits).map(([person, debt]) => (
          <div key={person} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span>{person} Pays:</span>
            <span style={{ fontWeight: 'bold' }}>${debt.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
        <span>GRAND TOTAL:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}