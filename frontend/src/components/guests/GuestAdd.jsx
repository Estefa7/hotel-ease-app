import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';

function GuestAdd({ onAdd }) {
  const [guest, setGuest] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    checkInDate: '',
    checkOutDate: '',
    roomId: ''
  });

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get('/rooms')
      .then(res => setRooms(res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/guests', guest);
      onAdd(res.data);
      setGuest({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        checkInDate: '',
        checkOutDate: '',
        roomId: ''
      });
    } catch (err) {
      console.error('Error adding guest:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>First Name</label>
        <input name="firstName" className="form-control" value={guest.firstName} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Last Name</label>
        <input name="lastName" className="form-control" value={guest.lastName} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Phone Number</label>
        <input name="phoneNumber" className="form-control" value={guest.phoneNumber} onChange={handleChange} required />
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
      <div className="mb-3">
        <label>Check-In Date</label>
        <input name="checkInDate" type="date" className="form-control" value={guest.checkInDate} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Check-Out Date</label>
        <input name="checkOutDate" type="date" className="form-control" value={guest.checkOutDate} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary">Add Guest</button>
    </form>
  );
}

export default GuestAdd;
