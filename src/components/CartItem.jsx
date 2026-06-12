import React from 'react';

export default function CartItem({ item, onRemove, currentUser }) {
  return (
    <div className="cart-item-row">
      <div>
        <h4>{item.name}</h4>
        <span className="item-info-meta">
          Added by: {item.addedBy === currentUser ? 'You' : item.addedBy}
        </span>
      </div>
      <div className="item-actions-container">
        <span className="item-price-display">${item.price.toFixed(2)}</span>
        <button 
          onClick={() => onRemove(item.id, item.name)} 
          className="btn-delete-item"
          title="Remove Item"
        >
        </button>
      </div>
    </div>
  );
}