import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import RoomList from '../components/rooms/RoomList';
import api from '../api/axiosInstance';
import RoomAdd from '../components/rooms/RoomAdd';
import RoomEdit from '../components/rooms/RoomEdit';

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isAddPopupVisible, setAddVisible] = useState(false);
  const [isEditPopupVisible, setEditVisible] = useState(false);

  const addRoom = (room) => {
    setRooms([...rooms, { ...room, id: Date.now() }]);
    setAddVisible(false);
  };

  const editRoom = (room) => {
    setRooms(rooms.map((r) => (r.id === room.id ? room : r)));
    setEditVisible(false);
  };

  const deleteRoom = (id) => setRooms(rooms.filter((r) => r.id !== id));

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
