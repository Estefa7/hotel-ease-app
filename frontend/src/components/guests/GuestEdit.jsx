import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';

function GuestEdit({ guest, onEdit }) {
  const [updatedGuest, setUpdatedGuest] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (guest) setUpdatedGuest(guest);
  }, [guest]);

  useEffect(() => {
    api.get('/rooms').then(res => setRooms(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedGuest(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/guests/${updatedGuest._id}`, updatedGuest);
      onEdit(res.data);
    } catch (err) {
      console.error('Error updating guest:', err);
    }
  };

  if (!updatedGuest) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>First Name</label>
        <input
          name="firstName"
          className="form-control"
          value={updatedGuest.firstName || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Last Name</label>
        <input
          name="lastName"
          className="form-control"
          value={updatedGuest.lastName || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Phone Number</label>
        <input
          name="phoneNumber"
          className="form-control"
          value={updatedGuest.phoneNumber || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Assign Room</label>
        <select
          name="roomId"
          className="form-select"
          value={updatedGuest.roomId || ''}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Room --</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>{room.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label>Check-In Date</label>
        <input
          name="checkInDate"
          type="date"
          className="form-control"
          value={updatedGuest.checkInDate?.slice(0, 10) || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Check-Out Date</label>
        <input
          name="checkOutDate"
          type="date"
          className="form-control"
          value={updatedGuest.checkOutDate?.slice(0, 10) || ''}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}

export default GuestEdit;
