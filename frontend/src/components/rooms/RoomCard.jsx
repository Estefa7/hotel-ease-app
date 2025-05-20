import { useEffect, useState } from 'react';

function RoomCard({ room, onEdit, onDelete }) {
  const [assignments, setAssignments] = useState({ currentGuests: [], futureGuests: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;

    const fetchAssignments = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`/api/rooms/${room._id}/assignments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
  }, [room._id, expanded]);

  const statusColors = {
    vacant: 'bg-success',
    occupied: 'bg-danger',
    maintenance: 'bg-warning',
  };

  return (
    <div
      className="card mb-3"
      onClick={() => setExpanded(!expanded)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Room {room.roomNumber}</h5>
        <span className={`badge ${statusColors[room.status]} px-3 py-2`}>
          {room.status}
        </span>
      </div>

      {expanded && (
        <div className="card-body border-top">
          <div className="row">
            {/* Left: Room Details */}
            <div className="col-md-6">
              <p>Type: {room.roomType}</p>
              <p>Price: ${room.pricePerNight}/night</p>
              <p>Capacity: {room.capacity}</p>
              <p>Balcony: {room.hasBalcony ? 'Yes' : 'No'}</p>
              <p>Available: {room.availability ? 'Yes' : 'No'}</p>

              <button className="btn btn-primary me-2" onClick={(e) => { e.stopPropagation(); onEdit(room); }}>Edit</button>
              <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); onDelete(room._id); }}>Delete</button>
            </div>

            {/* Right: Guest Info */}
            <div className="col-md-6">
              <div className="card bg-light p-3">
                {loading && <p>Loading guests...</p>}
                {error && <p className="text-danger">{error}</p>}

                {!loading && !error && (
                  <>
                    <h6>🟢 Current Guests</h6>
                    {assignments.currentGuests.length === 0 ? (
                      <p className="text-muted">None</p>
                    ) : (
                      <ul className="mb-3">
                        {assignments.currentGuests.map(guest => (
                          <li key={guest._id}>
                            {guest.firstName} {guest.lastName} —{' '}
                            {new Date(guest.checkInDate).toLocaleDateString()} to{' '}
                            {new Date(guest.checkOutDate).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                    )}

                    <h6>📅 Future Reservations</h6>
                    {assignments.futureGuests.length === 0 ? (
                      <p className="text-muted">None</p>
                    ) : (
                      <ul>
                        {assignments.futureGuests.map(guest => (
                          <li key={guest._id}>
                            {guest.firstName} {guest.lastName} —{' '}
                            {new Date(guest.checkInDate).toLocaleDateString()} to{' '}
                            {new Date(guest.checkOutDate).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomCard;
