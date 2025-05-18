import { useState } from 'react';
import Layout from '../components/layout/Layout';
import GuestList from '../components/guests/GuestList';
import GuestAdd from '../components/guests/GuestAdd';
import GuestEdit from '../components/guests/GuestEdit';

function GuestsPage() {
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isAddPopupVisible, setAddVisible] = useState(true);
  const [isEditPopupVisible, setEditVisible] = useState(false);

  const addGuest = (guest) => setGuests([...guests, { ...guest, id: Date.now() }]);
  const editGuest = (guest) => {
    setGuests(guests.map((g) => (g.id === guest.id ? guest : g)));
    setEditVisible(false);
  };
  const deleteGuest = (id) => setGuests(guests.filter((g) => g.id !== id));

  return (
    <Layout>
      <h2>Guests</h2>
      {isAddPopupVisible && <GuestAdd onAdd={addGuest} />}
      {isEditPopupVisible && <GuestEdit guest={selectedGuest} onEdit={editGuest} />}
      <GuestList guests={guests} onEdit={(guest) => { setSelectedGuest(guest); setEditVisible(true); }} onDelete={deleteGuest} />
    </Layout>
  );
}

export default GuestsPage;
