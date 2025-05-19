import styles from './GuestCard.module.css';

function GuestCard({ guest, onEdit, onDelete }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
  };

  return (
    <div className={styles.card}>
      <h3>{guest.firstName} {guest.lastName}</h3>
      <p>Phone: {guest.phoneNumber}</p>
      <p>Room: {guest.roomId?.roomNumber || guest.roomId?.roomType || 'Unknown'}</p>
      <p>Check-in: {formatDate(guest.checkInDate)}</p>
      <p>Check-out: {formatDate(guest.checkOutDate)}</p>

      <div className={styles.actions}>
        <button className={styles.edit} onClick={() => onEdit(guest)}>Edit</button>
        <button className={styles.delete} onClick={() => onDelete(guest._id)}>Delete</button>
      </div>
    </div>
  );
}

export default GuestCard;
