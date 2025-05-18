import { useState, useEffect } from 'react';

function GuestEdit({ guest, onEdit }) {
  const [editedGuest, setEditedGuest] = useState(guest);

  useEffect(() => {
    setEditedGuest(guest);
  }, [guest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedGuest);
  };

  if (!guest) return null;

  return (
    <form onSubmit={handleSubmit}>
      <input value={editedGuest.name} onChange={(e) => setEditedGuest({ ...editedGuest, name: e.target.value })} />
      <input value={editedGuest.email} onChange={(e) => setEditedGuest({ ...editedGuest, email: e.target.value })} />
      <button type="submit">Update Guest</button>
    </form>
  );
}

export default GuestEdit;
