import GuestCard from './GuestCard';

function GuestList({ guests, onEdit, onDelete }) {
  if (!guests || guests.length === 0) {
    return <p>No guests found.</p>;
  }

  return (
    <div className="guest-list">
      {guests.map((guest) => (
        <GuestCard
          key={guest._id}
          guest={guest}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default GuestList;
