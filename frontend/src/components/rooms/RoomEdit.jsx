import { useEffect, useState } from 'react';
import axios from 'axios';

function RoomEdit({ room, onEdit }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (room) setForm(room);
  }, [room]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/rooms/${form._id}`, {
        ...form,
        pricePerNight: Number(form.pricePerNight),
        capacity: Number(form.capacity)
      });
      onEdit(response.data);
    } catch (err) {
      console.error('Error updating room:', err);
    }
  };

  if (!form) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Room Number</label>
        <input
          name="roomNumber"
          className="form-control"
          value={form.roomNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Room Type</label>
        <input
          name="roomType"
          className="form-control"
          value={form.roomType}
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
          value={form.pricePerNight}
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
          value={form.capacity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>
          <input
            name="hasBalcony"
            type="checkbox"
            checked={form.hasBalcony}
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
          value={form.status}
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
            checked={form.availability}
            onChange={handleChange}
          />
          {' '}Available
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}

export default RoomEdit;
