import { useState } from 'react';
import Layout from '../components/layout/Layout';
import RoomList from '../components/rooms/RoomList';
import RoomAdd from '../components/rooms/RoomAdd';
import RoomEdit from '../components/rooms/RoomEdit';

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isAddPopupVisible, setAddVisible] = useState(true);
  const [isEditPopupVisible, setEditVisible] = useState(false);

  const addRoom = (room) => setRooms([...rooms, { ...room, id: Date.now() }]);
  const editRoom = (room) => {
    setRooms(rooms.map((r) => (r.id === room.id ? room : r)));
    setEditVisible(false);
  };
  const deleteRoom = (id) => setRooms(rooms.filter((r) => r.id !== id));

  return (
    <Layout>
      <h2>Rooms</h2>
      {isAddPopupVisible && <RoomAdd onAdd={addRoom} />}
      {isEditPopupVisible && <RoomEdit room={selectedRoom} onEdit={editRoom} />}
      <RoomList rooms={rooms} onEdit={(room) => { setSelectedRoom(room); setEditVisible(true); }} onDelete={deleteRoom} />
    </Layout>
  );
}

export default RoomsPage;
