import { useState, useEffect } from 'react';

function RoomEdit({ room, onEdit }) {
  const [editedRoom, setEditedRoom] = useState(room);

  useEffect(() => {
    setEditedRoom(room);
  }, [room]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedRoom);
  };

  if (!room) return null;

  return (
    <form onSubmit={handleSubmit}>
      <input value={editedRoom.name} onChange={(e) => setEditedRoom({ ...editedRoom, name: e.target.value })} />
      <input value={editedRoom.type} onChange={(e) => setEditedRoom({ ...editedRoom, type: e.target.value })} />
      <button type="submit">Update Room</button>
    </form>
  );
}

export default RoomEdit;
