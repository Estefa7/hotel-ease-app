import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';

function GuestEdit({ guest, onEdit }) {
  const [updatedGuest, setUpdatedGuest] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync incoming guest prop
  useEffect(() => {
    if (guest) setUpdatedGuest(guest);
  }, [guest]);

  // Load rooms once
  useEffect(() => {
    api.get('/rooms')
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load rooms', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedGuest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!updatedGuest) return;

    // Normalize roomId
    const payload = {
      ...updatedGuest,
      roomId:
        typeof updatedGuest.roomId === 'object'
          ? updatedGuest.roomId._id
          : updatedGuest.roomId
    };

    try {
      const res = await api.put(`/guests/${updatedGuest._id}`, payload);
      onEdit(res.data);
    } catch (err) {
      console.error('Error updating guest:', err);
    }
  };

  if (!updatedGuest || loading) return <p>Loading...</p>;

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
          value={
            typeof updatedGuest.roomId === 'object'
              ? updatedGuest.roomId._id
              : updatedGuest.roomId || ''
          }
          onChange={handleChange}
          required
        >
          <option value="">-- Select Room --</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>
              {room.roomNumber || room.roomType || `Room ${room._id}`}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label>Check-In Date</label>
        <input
          name="checkInDate"
          type="date"
          className="form-control"
          value={
            updatedGuest.checkInDate
              ? updatedGuest.checkInDate.slice(0, 10)
              : ''
          }
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
          value={
            updatedGuest.checkOutDate
              ? updatedGuest.checkOutDate.slice(0, 10)
              : ''
          }
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default GuestEdit;
