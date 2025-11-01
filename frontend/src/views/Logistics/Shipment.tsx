// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// ** Icons Imports
import EditOutline from 'mdi-material-ui/PencilOutline';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';

// ** API and Axios Imports
import axios from 'axios';

const ShipmentComponent = () => {
  // ** State
  const [shipments, setShipments] = useState([]);
  const [editingShipment, setEditingShipment] = useState(null);

  useEffect(() => {
    // Fetch shipments from the Django API on component mount
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Shipment/');
      setShipments(response.data);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    }
  };

  const handleEdit = (shipment) => {
    setEditingShipment(shipment);
  };

  const handleDelete = async (shipmentId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/Shipment/${shipmentId}/`);
      console.log('Shipment deleted successfully:', response.data);
      fetchShipments(); // Fetch shipments again after deletion
    } catch (error) {
      console.error('Error deleting shipment:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingShipment) {
        // Update existing shipment
        const response = await axios.put(`http://localhost:8000/Shipment/${editingShipment.id}/`, editingShipment);
        console.log('Shipment updated successfully:', response.data);
      } else {
        // Create new shipment
        const newShipment = {
          // Add other fields as needed
        };
        const response = await axios.post('http://localhost:8000/Shipment/', newShipment);
        console.log('New shipment added successfully:', response.data);
      }

      fetchShipments(); // Fetch shipments again after saving
      setEditingShipment(null); // Clear editing state
    } catch (error) {
      console.error('Error saving shipment:', error);
    }
  };

  const handleCancel = () => {
    setEditingShipment(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Shipments
      </Typography>

      {/* List of Shipments */}
      {shipments.map((shipment) => (
        <Box key={shipment.id}>
          {/* Display other fields as needed */}
          <Typography variant="body1">{shipment.id}</Typography>
          <Typography variant="body1">{shipment.supplier_from}</Typography>
          <Button onClick={() => handleEdit(shipment)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(shipment.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Shipment Form */}
      {editingShipment && (
        <Box>
          {/* Edit Shipment Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Shipment ID"
            value={editingShipment.id}
            onChange={(e) => setEditingShipment({ ...editingShipment, id: e.target.value })}
          />
          {/* Add other shipment fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Shipment Button */}
      <Button onClick={() => setEditingShipment({ id: '' })}>
        Add New Shipment
      </Button>
    </Box>
  );
};

export default ShipmentComponent;
