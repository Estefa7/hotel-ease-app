import { useState } from 'react';
import axios from 'axios';

function RoomAdd({ onAdd }) {
  const [room, setRoom] = useState({
    roomNumber: '',
    roomType: '',
    pricePerNight: '',
    capacity: '',
    hasBalcony: false,
    availability: true,
    status: 'vacant',
    createdBy: '6631d43a8db9a37a5670b9a1' // 📝 replace with real admin ID if using auth
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setRoom(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/rooms', {
        ...room,
        pricePerNight: Number(room.pricePerNight),
        capacity: Number(room.capacity)
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
        createdBy: '6631d43a8db9a37a5670b9a1'
      });
    } catch (err) {
      console.error('Error creating room:', err);
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
      <div className="mb-3">
        <label>Room Type</label>
        <input
          name="roomType"
          className="form-control"
          value={room.roomType}
          onChange={handleChange}
          required
        />
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
      <div className="mb-3">
        <label>
          <input
            name="hasBalcony"
            type="checkbox"
            checked={room.hasBalcony}
            onChange={handleChange}
          />
          {' '}Has Balcony
        </label>
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
      <div className="mb-3">
        <label>
          <input
            name="availability"
            type="checkbox"
            checked={room.availability}
            onChange={handleChange}
          />
          {' '}Available
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Add Room</button>
    </form>
  );
}

export default RoomAdd;
