import { useEffect, useState } from 'react';
import ConfirmModal from '../common/ConfirmModal'; // ✅ Import modal

function RoomCard({ room, onEdit, onDelete }) {
  const [assignments, setAssignments] = useState({ currentGuests: [], futureGuests: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // ✅ State for modal
const [canDelete, setCanDelete] = useState(true);

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

  const handleDelete = async (e) => {
  e.stopPropagation();

  try {
    const res = await fetch(`/api/rooms/${room._id}/assignments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to check room guests');
    const data = await res.json();

    const hasGuests = data.currentGuests.length > 0 || data.futureGuests.length > 0;
    setCanDelete(!hasGuests);
    setShowConfirm(true); // open modal
  } catch (err) {
    console.error('Error checking guests before delete:', err);
    alert('Could not verify guest assignments.');
  }
};


  const confirmDelete = () => {
    onDelete(room._id);   // ✅ Call delete
    setShowConfirm(false); // ✅ Close modal
  };

  return (
    <>
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

                <button
                  className="btn btn-primary me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(room);
                  }}
                >
                  Edit
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
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
                          {assignments.currentGuests.map((guest) => (
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
                          {assignments.futureGuests.map((guest) => (
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

      {/* ✅ Confirmation Modal */}
      {showConfirm && (
        <ConfirmModal
  title="Confirm Deletion"
  message={
    canDelete
      ? `Are you sure you want to delete Room ${room.roomNumber}?`
      : `This room has assigned guests and cannot be deleted.`
  }
  onCancel={() => setShowConfirm(false)}
  onConfirm={() => {
    if (canDelete) confirmDelete();
    }}
    confirmDisabled={!canDelete} 
/>
      )}
    </>
  );
}

export default RoomCard;
