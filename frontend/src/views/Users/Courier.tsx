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
import apiClient from 'src/services/apiClient';

const CourierComponent = () => {
  // ** State
  const [couriers, setCouriers] = useState([]);
  const [editingCourier, setEditingCourier] = useState(null);

  useEffect(() => {
    // Fetch couriers from the Django API on component mount
    fetchCouriers();
  }, []);

  const fetchCouriers = async () => {
    try {
      const response = await apiClient.get('/couriers/');
      setCouriers(response.data);
    } catch (error) {
      console.error('Error fetching couriers:', error);
    }
  };

  const handleEdit = (courier) => {
    setEditingCourier(courier);
  };

  const handleDelete = async (courierId) => {
    try {
      const response = await apiClient.delete(`/couriers/${courierId}/`);
      console.log('Courier deleted successfully:', response.data);
      fetchCouriers(); // Fetch couriers again after deletion
    } catch (error) {
      console.error('Error deleting courier:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingCourier) {
        // Update existing courier
        const response = await apiClient.put(`/couriers/${editingCourier.id}/`, editingCourier);
        console.log('Courier updated successfully:', response.data);
      } else {
        // Create new courier
        const newCourier = {
          phone_number: '',
          password: '',
          is_online: false,

          // Add other fields as needed
        };
        const response = await apiClient.post('/couriers/', newCourier);
        console.log('New courier added successfully:', response.data);
      }

      fetchCouriers(); // Fetch couriers again after saving
      setEditingCourier(null); // Clear editing state
    } catch (error) {
      console.error('Error saving courier:', error);
    }
  };

  const handleCancel = () => {
    setEditingCourier(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Couriers
      </Typography>

      {/* List of Couriers */}
      {couriers.map((courier) => (
        <Box key={courier.id}>
          <Typography variant="body1">{courier.phone_number}</Typography>
          <Button onClick={() => handleEdit(courier)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(courier.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Courier Form */}
      {editingCourier && (
        <Box>
          {/* Edit Courier Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Phone Number"
            value={editingCourier.phone_number}
            onChange={(e) => setEditingCourier({ ...editingCourier, phone_number: e.target.value })}
          />
          {/* Add other courier fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Courier Button */}
      <Button onClick={() => setEditingCourier({ phone_number: '', password: '', is_online: false })}>
        Add New Courier
      </Button>
    </Box>
  );
};

export default CourierComponent;
