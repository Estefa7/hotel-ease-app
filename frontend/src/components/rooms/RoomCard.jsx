import styles from './RoomCard.module.css';

function RoomCard({ room, onEdit, onDelete }) {
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
    </div>
  );
}

export default RoomCard;
