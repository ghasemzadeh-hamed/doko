// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// ** Icons Imports
import EditOutline from 'mdi-material-ui/PencilOutline';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';

// ** API and Axios Imports
import apiClient from 'src/services/apiClient';

const ServiceComponent = () => {
  // ** State
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    // Fetch services from the Django API on component mount
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await apiClient.get('/Service/');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
  };

  const handleDelete = async (serviceId) => {
    try {
      const response = await apiClient.delete(`/Service/${serviceId}/`);
      console.log('Service deleted successfully:', response.data);
      fetchServices(); // Fetch services again after deletion
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingService) {
        // Update existing service
        const response = await apiClient.put(`/Service/${editingService.id}/`, editingService);
        console.log('Service updated successfully:', response.data);
      } else {
        // Create new service
        const newService = {
          // Add other fields as needed
        };
        const response = await apiClient.post('/Service/', newService);
        console.log('New service added successfully:', response.data);
      }

      fetchServices(); // Fetch services again after saving
      setEditingService(null); // Clear editing state
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleCancel = () => {
    setEditingService(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Services
      </Typography>

      {/* List of Services */}
      {services.map((service) => (
        <Box key={service.id}>
          {/* Display other fields as needed */}
          <Typography variant="body1">{service.name}</Typography>
          <Typography variant="body1">{service.description}</Typography>
          <Button onClick={() => handleEdit(service)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(service.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Service Form */}
      {editingService && (
        <Box>
          {/* Edit Service Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Name"
            value={editingService.name}
            onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={editingService.description}
            onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
          />

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Service Button */}
      <Button onClick={() => setEditingService({ name: '', description: '' })}>Add New Service</Button>
    </Box>
  );
};

export default ServiceComponent;
