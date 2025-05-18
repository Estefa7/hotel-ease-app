import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
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

  const [filters, setFilters] = useState({
  roomType: '',
  status: '',
  hasBalcony: '',
  sortBy: '',
  search: '',
  minPrice: '',
  maxPrice: '',
});


  useEffect(() => {
    fetchRooms();
  }, [filters]);

  const fetchRooms = async () => {
    try {
      const res = await api.get('/rooms', { params: filters });
      setRooms(res.data);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

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

<Form className="mb-3">
  <Row>
    <Col md={4}>
      <Form.Label>Search by Room Number</Form.Label>
      <Form.Control
        type="text"
        name="search"
        value={filters.search}
        onChange={handleFilterChange}
        placeholder="Enter room number"
      />
    </Col>

    <Col md={4}>
      <Form.Label>Min Price</Form.Label>
      <Form.Control
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleFilterChange}
        placeholder="0"
      />
    </Col>

    <Col md={4}>
      <Form.Label>Max Price</Form.Label>
      <Form.Control
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleFilterChange}
        placeholder="1000"
      />
    </Col>
  </Row>
</Form>

      {/* Filters and Sorting */}
      <Form className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Label>Room Type</Form.Label>
            <Form.Select name="roomType" value={filters.roomType} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="vacant">Vacant</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Label>Has Balcony</Form.Label>
            <Form.Select name="hasBalcony" value={filters.hasBalcony} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Label>Sort by Price</Form.Label>
            <Form.Select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
              <option value="">Default</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

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
