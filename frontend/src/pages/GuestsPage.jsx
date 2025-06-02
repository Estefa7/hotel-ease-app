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
  const [successMessage, setSuccessMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({
  staying: true,
  upcoming: false,
  checkedOut: false,
});

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
      await fetchGuests();
      setAddVisible(false); // Close the modal
      setSuccessMessage('✅ Guest added successfully');
      setTimeout(() => setSuccessMessage(''), 3000); // Hide message after 3s
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

  const toggleFilter = (key) => {
  setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
};
  // Filter logic
  const now = new Date();
  const filteredGuests = guests.filter((guest) => {
    const checkIn = new Date(guest.checkInDate);
    const checkOut = new Date(guest.checkOutDate);

    return (
      (filters.staying && checkIn <= now && checkOut >= now) ||
      (filters.upcoming && checkIn > now) ||
      (filters.checkedOut && checkOut < now)
    );
  });

  const sortedGuests = [...filteredGuests].sort((a, b) => {
  return new Date(a.checkInDate) - new Date(b.checkInDate); // ascending
});

  return (
    <Layout>
       {/* ✅ Success Message Overlay */}
      {successMessage && (
        <div
          className="alert alert-success"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
          }}
        >
          {successMessage}
        </div>
      )}

      {/* 🔘 Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Guests</h2>
        <Button variant="success" onClick={() => setAddVisible(true)}>
          Add Guest
        </Button>
      </div>

      {/* 🔘 Filter Buttons */}
      <div className="d-flex gap-2 mb-3">
        <Button
          variant={filters.staying ? 'success' : 'outline-secondary'}
          onClick={() => toggleFilter('staying')}
        >
          Staying
        </Button>
        <Button
          variant={filters.upcoming ? 'success' : 'outline-secondary'}
          onClick={() => toggleFilter('upcoming')}
        >
          Upcoming
        </Button>
        <Button
          variant={filters.checkedOut ? 'success' : 'outline-secondary'}
          onClick={() => toggleFilter('checkedOut')}
        >
          Checked Out
        </Button>
      </div>

      
      <GuestList
        guests={sortedGuests}
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
