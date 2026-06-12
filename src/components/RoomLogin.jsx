import React from 'react';

export default function RoomLogin({ onJoin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const roomCode = e.target.roomCode.value.trim().toUpperCase();
    if (username && roomCode) {
      onJoin(username, roomCode);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h2 className="login-title">Welcome to CartShare</h2>
        <p className="login-subtitle">Collaborate & pool orders seamlessly.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input name="username" type="text" required placeholder="e.g., Rohit" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Room Code</label>
            <input name="roomCode" type="text" required placeholder="e.g., ROOM-101" className="form-input form-input-mono" />
          </div>
          <button type="submit" className="btn-primary">
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}