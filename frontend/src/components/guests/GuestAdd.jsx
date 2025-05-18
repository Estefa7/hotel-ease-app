import { useState } from 'react';

function GuestAdd({ onAdd }) {
  const [guest, setGuest] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(guest);
    setGuest({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} placeholder="Name" />
      <input value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} placeholder="Email" />
      <button type="submit">Add Guest</button>
    </form>
  );
}

export default GuestAdd;
