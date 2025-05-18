import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import RoomList from '../components/rooms/RoomList';
import RoomAdd from '../components/rooms/RoomAdd';
import RoomEdit from '../components/rooms/RoomEdit';
import api from '../api/axiosInstance';

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isAddPopupVisible, setAddVisible] = useState(false);
  const [isEditPopupVisible, setEditVisible] = useState(false);

  // ✅ Fetch rooms when the component mounts
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await api.get('/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  };

  // ✅ After adding, reload from backend
  const addRoom = () => {
    fetchRooms();
    setAddVisible(false);
  };

  const editRoom = () => {
    fetchRooms();
    setEditVisible(false);
  };

  const deleteRoom = async (id) => {
    try {
      await api.delete(`/rooms/${id}`);
      fetchRooms();
    } catch (err) {
      console.error('Error deleting room:', err);
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Rooms</h2>
        <Button variant="success" onClick={() => setAddVisible(true)}>Add Room</Button>
      </div>

      {/* Room List */}
      <RoomList
        rooms={rooms}
        onEdit={(room) => {
          setSelectedRoom(room);
          setEditVisible(true);
        }}
        onDelete={deleteRoom}
      />

      {/* Add Room Modal */}
      <Modal show={isAddPopupVisible} onHide={() => setAddVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoomAdd onAdd={addRoom} />
        </Modal.Body>
      </Modal>

      {/* Edit Room Modal */}
      <Modal show={isEditPopupVisible} onHide={() => setEditVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoomEdit room={selectedRoom} onEdit={editRoom} />
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default RoomsPage;
