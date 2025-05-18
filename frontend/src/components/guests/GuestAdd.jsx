import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';

function GuestAdd({ onAdd }) {
  const [guest, setGuest] = useState({ name: '', email: '', roomId: '' });
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get('/rooms').then(res => setRooms(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(guest);
    setGuest({ name: '', email: '', roomId: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Name</label>
        <input name="name" className="form-control" value={guest.name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input name="email" className="form-control" value={guest.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Assign Room</label>
        <select name="roomId" className="form-select" value={guest.roomId} onChange={handleChange} required>
          <option value="">-- Select Room --</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>{room.name}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" type="submit">Add Guest</button>
    </form>
  );
}

export default GuestAdd;
