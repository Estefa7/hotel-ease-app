import { useState } from 'react';

function RoomAdd({ onAdd }) {
  const [room, setRoom] = useState({ name: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(room);
    setRoom({ name: '', type: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={room.name} onChange={(e) => setRoom({ ...room, name: e.target.value })} placeholder="Name" />
      <input value={room.type} onChange={(e) => setRoom({ ...room, type: e.target.value })} placeholder="Type" />
      <button type="submit">Add Room</button>
    </form>
  );
}

export default RoomAdd;
