import { useEffect, useState } from 'react';
import { useAuth } from '../../components/auth/AuthProvider';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import countryCodes from '../../constants/countryCodes';

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
  const [submitting, setSubmitting] = useState(false); // 🛡️ Prevent duplicate submit


const [countryCode, setCountryCode] = useState('+420');
const [phoneError, setPhoneError] = useState('');
const [dateError, setDateError] = useState('');

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
    if (name === 'checkInDate' || name === 'checkOutDate') {
  setDateError('');
  if (name === 'phoneNumber') {
    setPhoneError('');
  }
}

  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (submitting) {
    console.log("🚫 Submission already in progress, skipping...");
    return;
  }

  const selectedCountry = countryCodes.find(c => c.code === countryCode);
  const isPhoneValid =
    /^\d+$/.test(guest.phoneNumber) &&
    guest.phoneNumber.length === selectedCountry.length;

  if (!isPhoneValid) {
    setPhoneError(`Please enter a valid ${selectedCountry.length}-digit number.`);
    return;
  }
  // Reset error state
  
    setPhoneError('');

    const now = new Date();
  const checkIn = new Date(guest.checkInDate);
  const checkOut = new Date(guest.checkOutDate);

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(now.getFullYear() + 1);

  if (checkOut <= checkIn) {
    setDateError("Check-out date must be after check-in date.");
    return;
  }

  if (checkIn < oneYearAgo || checkIn > oneYearFromNow) {
    setDateError("Check-in date must be within one year from today.");
    return;
  }

  if (checkOut < oneYearAgo || checkOut > oneYearFromNow) {
    setDateError("Check-out date must be within one year from today.");
    return;
  }

  setDateError('');
  setSubmitting(true);
  console.log("🚀 Submitting guest:", guest);

  if (!user) {
    console.error('User not found in context. Please log in.');
    setSubmitting(false);
    return;
  }
const fullPhoneNumber = `${countryCode}${guest.phoneNumber}`;
  const guestData = { ...guest, phoneNumber: fullPhoneNumber };



  try {
    const res = await api.post('/guests', guestData);
    console.log('✅ Guest added successfully:', res.data);

    if (onAdd) {
      console.log('📣 Calling onAdd callback');
      onAdd(res.data);
    }

    // Reset form
    setGuest({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      checkInDate: '',
      checkOutDate: '',
      roomId: ''
    });

  } catch (err) {
    if (err.response?.data?.error) {
      console.error('❌ Backend validation error:', err.response.data);
      alert(`Error: ${err.response.data.error}`);
    } else {
      console.error('❌ Error adding guest:', err);
    }
  } finally {
    setSubmitting(false); // ✅ Reset submitting state after request
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
  <div style={{ display: 'flex', gap: '8px' }}>
    <select
      className="form-select"
      value={countryCode}
      onChange={(e) => setCountryCode(e.target.value)}
      style={{ width: '150px' }}
    >
      {countryCodes.map((c) => (
        <option key={c.code} value={c.code}>
          {c.country} ({c.code})
        </option>
      ))}
    </select>
    <input
      type="text"
      className="form-control"
      value={guest.phoneNumber}
      onChange={(e) =>
        setGuest((prev) => ({ ...prev, phoneNumber: e.target.value }))
      }
      placeholder="Enter phone number"
      required
    />
  </div>
  {phoneError && <small className="text-danger">{phoneError}</small>}
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
              {room.roomNumber || `Room ${room._id}`}
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
          {dateError && <small className="text-danger">{dateError}</small>}
      </div>
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Guest'}
      </button>
    </form>
  );
}

export default GuestAdd;
