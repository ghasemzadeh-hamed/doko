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

const ManagerComponent = () => {
  // ** State
  const [managers, setManagers] = useState([]);
  const [editingManager, setEditingManager] = useState(null);

  useEffect(() => {
    // Fetch managers from the Django API on component mount
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await apiClient.get('/managers/');
      setManagers(response.data);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  const handleEdit = (manager) => {
    setEditingManager(manager);
  };

  const handleDelete = async (managerId) => {
    try {
      const response = await apiClient.delete(`/managers/${managerId}/`);
      console.log('Manager deleted successfully:', response.data);
      fetchManagers(); // Fetch managers again after deletion
    } catch (error) {
      console.error('Error deleting manager:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingManager) {
        // Update existing manager
        const response = await apiClient.put(`/managers/${editingManager.id}/`, editingManager);
        console.log('Manager updated successfully:', response.data);
      } else {
        // Create new manager
        const newManager = {
          phone_number: '',
          is_active: false,
          is_super_manager: false,
          is_technical_manager: false,
          is_support_manager: false,

          // Add other fields as needed
        };
        const response = await apiClient.post('/managers/', newManager);
        console.log('New manager added successfully:', response.data);
      }

      fetchManagers(); // Fetch managers again after saving
      setEditingManager(null); // Clear editing state
    } catch (error) {
      console.error('Error saving manager:', error);
    }
  };

  const handleCancel = () => {
    setEditingManager(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Managers
      </Typography>

      {/* List of Managers */}
      {managers.map((manager) => (
        <Box key={manager.id}>
          <Typography variant="body1">{manager.phone_number}</Typography>
          <Button onClick={() => handleEdit(manager)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(manager.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Manager Form */}
      {editingManager && (
        <Box>
          {/* Edit Manager Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Phone Number"
            value={editingManager.phone_number}
            onChange={(e) => setEditingManager({ ...editingManager, phone_number: e.target.value })}
          />
          {/* Add other manager fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Manager Button */}
      <Button onClick={() => setEditingManager({ phone_number: '', is_active: false, is_super_manager: false, is_technical_manager: false, is_support_manager: false })}>
        Add New Manager
      </Button>
    </Box>
  );
};

export default ManagerComponent;

