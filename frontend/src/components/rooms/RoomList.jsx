import RoomCard from './RoomCard';

function RoomList({ rooms, onEdit, onDelete }) {
  if (!rooms.length) return <p>No rooms available.</p>;

  return (
    <>
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </>
  );
}

export default RoomList;
