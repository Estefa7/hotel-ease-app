import { useEffect, useState } from 'react';
import styles from './RoomCard.module.css';

function RoomCard({ room, onEdit, onDelete }) {
  const [assignments, setAssignments] = useState({ currentGuests: [], futureGuests: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`/api/rooms/${room._id}/assignments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // adjust if you store token differently
          },
        });
        if (!res.ok) throw new Error('Failed to load assignments');
        const data = await res.json();
        setAssignments(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [room._id]);

  return (
    <div className={styles.card}>
      <h3>Room {room.roomNumber}</h3>
      <p>Type: {room.roomType}</p>
      <p>Price: ${room.pricePerNight}/night</p>
      <p>Capacity: {room.capacity} guests</p>
      <p>Status: {room.status}</p>
      <p>Balcony: {room.hasBalcony ? 'Yes' : 'No'}</p>
      <p>Available: {room.availability ? 'Yes' : 'No'}</p>

      <button onClick={() => onEdit(room)}>Edit</button>
      <button onClick={() => onDelete(room._id)}>Delete</button>

      <div style={{ marginTop: '1rem' }}>
        {loading && <p>Loading guests...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && (
          <>
            <h4>🟢 Current Guests</h4>
            {assignments.currentGuests.length === 0 ? (
              <p>None</p>
            ) : (
              <ul>
                {assignments.currentGuests.map(guest => (
                  <li key={guest._id}>
                    {guest.firstName} {guest.lastName} — {new Date(guest.checkInDate).toLocaleDateString()} to {new Date(guest.checkOutDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}

            <h4>📅 Future Reservations</h4>
            {assignments.futureGuests.length === 0 ? (
              <p>None</p>
            ) : (
              <ul>
                {assignments.futureGuests.map(guest => (
                  <li key={guest._id}>
                     {guest.firstName} {guest.lastName} — {new Date(guest.checkInDate).toLocaleDateString()} to {new Date(guest.checkOutDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
