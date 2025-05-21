import React, { useState } from 'react';
import styles from './GuestCard.module.css';
import ConfirmModal from '../common/ConfirmModal'; // ✅ Import modal

function GuestCard({ guest, onEdit, onDelete }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
  };

  const handleDeleteClick = () => {
    setShowConfirm(true); // Just trigger modal
  };

  const confirmDelete = () => {
    onDelete(guest._id);
    setShowConfirm(false);
  };

    const now = new Date();
  const checkIn = new Date(guest.checkInDate);
  const checkOut = new Date(guest.checkOutDate);

  let deleteMessage = 'Are you sure you want to delete this guest?';
  if (checkIn <= now && checkOut >= now) {
    deleteMessage = 'This guest has a current stay. Are you sure you want to delete?';
  } else if (checkIn > now) {
    deleteMessage = 'This guest has an upcoming reservation. Are you sure you want to delete?';
  }

  return (
    <>
    <div className={styles.card}>
      <h3>{guest.firstName} {guest.lastName}</h3>
      <p>Phone: {guest.phoneNumber}</p>
      <p>Room: {guest.roomId?.roomNumber || guest.roomId?.roomType || 'Unknown'}</p>
      <p>Check-in: {formatDate(guest.checkInDate)}</p>
      <p>Check-out: {formatDate(guest.checkOutDate)}</p>

      <div className={styles.actions}>
        <button className={styles.edit} onClick={() => onEdit(guest)}>Edit</button>
<button className={styles.delete} onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>

       {showConfirm && (
        <ConfirmModal
          title="Confirm Deletion"
          message={deleteMessage}
          onCancel={() => setShowConfirm(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}

export default GuestCard;
