import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import GuestList from '../components/guests/GuestList';
import GuestAdd from '../components/guests/GuestAdd';
import GuestEdit from '../components/guests/GuestEdit';
import api from '../api/axiosInstance';

function GuestsPage() {
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isAddPopupVisible, setAddVisible] = useState(false);
  const [isEditPopupVisible, setEditVisible] = useState(false);

  // Fetch guests from backend
  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const res = await api.get('/guests');
      setGuests(res.data);
    } catch (err) {
      console.error('Error fetching guests:', err);
    }
  };

  const addGuest = async (guest) => {
    try {
      fetchGuests();
      setAddVisible(false);
    } catch (err) {
      console.error('Error adding guest:', err);
    }
  };

  const editGuest = async (guest) => {
    try {
      await api.put(`/guests/${guest._id}`, guest);
      fetchGuests();
      setEditVisible(false);
    } catch (err) {
      console.error('Error editing guest:', err);
    }
  };

  const deleteGuest = async (id) => {
    try {
      await api.delete(`/guests/${id}`);
      fetchGuests();
    } catch (err) {
      console.error('Error deleting guest:', err);
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Guests</h2>
        <Button variant="success" onClick={() => setAddVisible(true)}>Add Guest</Button>
      </div>

      <GuestList
        guests={guests}
        onEdit={(guest) => {
          setSelectedGuest(guest);
          setEditVisible(true);
        }}
        onDelete={deleteGuest}
      />

      {/* Add Guest Modal */}
      <Modal show={isAddPopupVisible} onHide={() => setAddVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Guest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GuestAdd onAdd={addGuest} />
        </Modal.Body>
      </Modal>

      {/* Edit Guest Modal */}
      <Modal show={isEditPopupVisible} onHide={() => setEditVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Guest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GuestEdit guest={selectedGuest} onEdit={editGuest} />
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default GuestsPage;
