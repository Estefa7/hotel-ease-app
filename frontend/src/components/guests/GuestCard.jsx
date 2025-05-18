import styles from './GuestCard.module.css';

function GuestCard({ guest, onEdit, onDelete }) {
  return (
    <div className={styles.card}>
      <h3>{guest.name}</h3>
      <p>Email: {guest.email}</p>
      <button onClick={() => onEdit(guest)}>Edit</button>
      <button onClick={() => onDelete(guest.id)}>Delete</button>
    </div>
  );
}

export default GuestCard;
