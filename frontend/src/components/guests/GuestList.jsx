import GuestCard from './GuestCard';

function GuestList({ guests, onEdit, onDelete }) {
  if (!guests.length) return <p>No guests found.</p>;

  return guests.map((guest) => (
    <GuestCard key={guest.id} guest={guest} onEdit={onEdit} onDelete={onDelete} />
  ));
}

export default GuestList;
