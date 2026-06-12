import React, { useState, useEffect } from 'react';
import RoomLogin from './components/RoomLogin';
import CartItem from './components/CartItem';
import ActivityLog from './components/ActivityLog';
import Receipt from './components/Receipt';

export default function App() {
  const [user, setUser] = useState(localStorage.getItem('cs_user') || '');
  const [room, setRoom] = useState(localStorage.getItem('cs_room') || '');
  const [cart, setCart] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!room) return;
    const channel = new BroadcastChannel(`cartshare_${room}`);
    channel.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === 'SYNC_DATA') {
        setCart(payload.cart);
        setLogs(payload.logs);
      }
    };
    return () => channel.close();
  }, [room]);

  const updateAndBroadcast = (newCart, newLogs) => {
    setCart(newCart);
    setLogs(newLogs);
    if (room) {
      const channel = new BroadcastChannel(`cartshare_${room}`);
      channel.postMessage({
        type: 'SYNC_DATA',
        payload: { cart: newCart, logs: newLogs }
      });
      channel.close();
    }
  };

  const handleJoinRoom = (username, roomCode) => {
    setUser(username);
    setRoom(roomCode);
    localStorage.setItem('cs_user', username);
    localStorage.setItem('cs_room', roomCode);
    
    const initialLog = [`[${new Date().toLocaleTimeString()}] ${username} entered room.`];
    updateAndBroadcast(cart, [...initialLog, ...logs]);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const name = e.target.itemName.value;
    const price = parseFloat(e.target.itemPrice.value);
    if (!name || isNaN(price)) return;

    const newItem = { id: Date.now(), name, price, addedBy: user };
    const newCart = [...cart, newItem];
    const newLogs = [`[${new Date().toLocaleTimeString()}] ${user} added "${name}" ($${price})`, ...logs];
    
    updateAndBroadcast(newCart, newLogs);
    e.target.reset();
  };

  const handleRemoveItem = (id, name) => {
    const newCart = cart.filter(item => item.id !== id);
    const newLogs = [`[${new Date().toLocaleTimeString()}] ${user} removed "${name}"`, ...logs];
    updateAndBroadcast(newCart, newLogs);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser('');
    setRoom('');
    setCart([]);
    setLogs([]);
  };

  if (!room || !user) {
    return <RoomLogin onJoin={handleJoinRoom} />;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const threshold = 75;
  const progressPercent = Math.min((total / threshold) * 100, 100);

  return (
    <div className="app-container">
      {/* Main Dashboard Screen */}
      <header className="main-header print-hidden">
        <div>
          <h1 className="main-title">CartShare</h1>
          <p className="main-meta">
            Room: <span className="meta-bold">{room}</span> | User: <span className="meta-bold">{user}</span>
          </p>
        </div>
        <button onClick={handleLogout} className="btn-leave">
          Leave Room
        </button>
      </header>

      <main className="dashboard-grid print-hidden">
        <div className="main-content">
          
          {/* Progress Section */}
          <div className="dashboard-card">
            <div className="progress-meta">
              <span className="progress-label">Free Shipping Progress ($75 target)</span>
              <span className="progress-total">${total.toFixed(2)}</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className={`progress-bar-fill ${progressPercent >= 100 ? 'unlocked' : ''}`}
                style={{ '--progress-width': `${progressPercent}%` }}
              ></div>
            </div>
            <p className="progress-footer-text">
              {total >= threshold ? "Free shipping threshold unlocked!" : `Add $${(threshold - total).toFixed(2)} more to secure free delivery.`}
            </p>
          </div>

          {/* Add Item Form */}
          <div className="dashboard-card">
            <form onSubmit={handleAddItem} className="add-item-form">
              <input name="itemName" type="text" placeholder="Item Name (e.g., Bread)" required className="form-input" style={{ flex: 1 }} />
              <input name="itemPrice" type="number" step="0.01" placeholder="Price" required className="form-input" style={{ width: '120px' }} />
              <button type="submit" className="form-btn-add">Add Item</button>
            </form>
          </div>

          {/* Items Display Panel */}
          <div className="dashboard-card">
            <h2 className="card-title">Shared Cart Dashboard</h2>
            {cart.length === 0 ? (
              <p className="empty-msg">No items added yet.</p>
            ) : (
              <div className="cart-list">
                {cart.map(item => (
                  <CartItem key={item.id} item={item} onRemove={handleRemoveItem} currentUser={user} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="sidebar-content">
          <ActivityLog logs={logs} />
          <div className="dashboard-card" style={{ textAlign: 'center' }}>
            <h3 className="card-title" style={{ marginBottom: '0.5rem' }}>Ready to checkout?</h3>
            <p className="checkout-text">Generate your clean printable invoice statement sheet here.</p>
            <button onClick={() => window.print()} className="btn-print-action">
              Print Shared Receipt
            </button>
          </div>
        </div>
      </main>

      {/* Printing Mode Mirror Area */}
      <div className="receipt-print-area">
        <Receipt cart={cart} room={room} total={total} />
      </div>
    </div>
  );
}