import { useEffect, useState } from 'react';
import { useAuth } from '../../components/auth/AuthProvider';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function GuestAdd({ onAdd }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [guest, setGuest] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    checkInDate: '',
    checkOutDate: '',
    roomId: ''
  });

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    api.get('/rooms')
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load rooms', err);
        setLoading(false);
      });
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      console.log('🚨 Full user from context:', user); // 👈 ADD THIS

    const adminId = user?.id || user?._id;
    if (!adminId) {
      console.error('Admin ID not found in context. Please log in.');
      return;
    }

    try {
      console.log('GuestAdd - user:', user);
console.log('Submitting guest payload:', {
  ...guest,
  createdBy: adminId
});

      const res = await api.post('/guests', {
        ...guest,
        createdBy: adminId
      });

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
  if (err.response && err.response.data) {
    console.error('Backend validation error:', err.response.data);
  } else {
    console.error('Error adding guest:', err);
  }
}

  };

  if (loading) return <p>Loading rooms, please wait...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>First Name</label>
        <input
          name="firstName"
          className="form-control"
          value={guest.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Last Name</label>
        <input
          name="lastName"
          className="form-control"
          value={guest.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Phone Number</label>
        <input
          name="phoneNumber"
          className="form-control"
          value={guest.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Assign Room</label>
        <select
          name="roomId"
          className="form-select"
          value={guest.roomId}
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
          value={guest.checkInDate}
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
          value={guest.checkOutDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Guest</button>
    </form>
  );
}

export default GuestAdd;
