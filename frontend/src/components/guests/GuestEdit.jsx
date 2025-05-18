import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';

function GuestEdit({ guest, onEdit }) {
  const [updatedGuest, setUpdatedGuest] = useState(guest);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setUpdatedGuest(guest); // Reset form on guest change
  }, [guest]);

  useEffect(() => {
    api.get('/rooms').then(res => setRooms(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedGuest(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(updatedGuest);
  };

  if (!updatedGuest) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Name</label>
        <input name="name" className="form-control" value={updatedGuest.name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input name="email" className="form-control" value={updatedGuest.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Assign Room</label>
        <select name="roomId" className="form-select" value={updatedGuest.roomId} onChange={handleChange} required>
          <option value="">-- Select Room --</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>{room.name}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" type="submit">Save</button>
    </form>
  );
}

export default GuestEdit;
