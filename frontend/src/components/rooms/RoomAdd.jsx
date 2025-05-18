import { useState } from 'react';
import api from '../../api/axiosInstance'; // ✅ Use the configured Axios instance

function RoomAdd({ onAdd }) {
  const [room, setRoom] = useState({
    roomNumber: '',
    roomType: '',
    pricePerNight: '',
    capacity: '',
    hasBalcony: false,
    availability: true,
    status: 'vacant',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoom((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/rooms', {
        ...room,
        pricePerNight: Number(room.pricePerNight),
        capacity: Number(room.capacity),
      });

      onAdd(response.data);

      // Reset form
      setRoom({
        roomNumber: '',
        roomType: '',
        pricePerNight: '',
        capacity: '',
        hasBalcony: false,
        availability: true,
        status: 'vacant',
      });
    } catch (err) {
      console.error('Error creating room:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Room Number</label>
        <input
          name="roomNumber"
          className="form-control"
          value={room.roomNumber}
          onChange={handleChange}
          required
        />
      </div>

      {/* ✅ Room Type Dropdown */}
      <div className="mb-3">
        <label>Room Type</label>
        <select
          name="roomType"
          className="form-select"
          value={room.roomType}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Room Type --</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Price per Night</label>
        <input
          name="pricePerNight"
          type="number"
          className="form-control"
          value={room.pricePerNight}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Capacity</label>
        <input
          name="capacity"
          type="number"
          className="form-control"
          value={room.capacity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 form-check">
        <input
          name="hasBalcony"
          type="checkbox"
          className="form-check-input"
          checked={room.hasBalcony}
          onChange={handleChange}
        />
        <label className="form-check-label">Has Balcony</label>
      </div>

      <div className="mb-3">
        <label>Status</label>
        <select
          name="status"
          className="form-select"
          value={room.status}
          onChange={handleChange}
        >
          <option value="vacant">Vacant</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="mb-3 form-check">
        <input
          name="availability"
          type="checkbox"
          className="form-check-input"
          checked={room.availability}
          onChange={handleChange}
        />
        <label className="form-check-label">Available</label>
      </div>

      <button type="submit" className="btn btn-primary">Add Room</button>
    </form>
  );
}

export default RoomAdd;
