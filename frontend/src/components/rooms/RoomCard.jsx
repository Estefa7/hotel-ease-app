import styles from './RoomCard.module.css';

function RoomCard({ room, onEdit, onDelete }) {
  return (
    <div className={styles.card}>
      <h3>{room.name}</h3>
      <p>Type: {room.type}</p>
      <button onClick={() => onEdit(room)}>Edit</button>
      <button onClick={() => onDelete(room.id)}>Delete</button>
    </div>
  );
}

export default RoomCard;
