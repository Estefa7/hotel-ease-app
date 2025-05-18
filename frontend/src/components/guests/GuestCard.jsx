import styles from './GuestCard.module.css';

function GuestCard({ guest, onEdit, onDelete }) {
  return (
    <div className={styles.card}>
      <h3>{guest.firstName} {guest.lastName}</h3>
      <p>Phone: {guest.phoneNumber}</p>
      <p>Room: {guest.roomId?.name || guest.roomId}</p>
      <p>Check-in: {new Date(guest.checkInDate).toLocaleDateString()}</p>
      <p>Check-out: {new Date(guest.checkOutDate).toLocaleDateString()}</p>
      <button onClick={() => onEdit(guest)}>Edit</button>
      <button onClick={() => onDelete(guest._id)}>Delete</button>
    </div>
  );
}

export default GuestCard;
