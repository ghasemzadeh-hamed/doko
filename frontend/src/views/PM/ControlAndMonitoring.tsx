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

const API_ENDPOINT = '/ControlAndMonitoring/';

const ControlAndMonitoringComponent = () => {
  // ** State
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    // Fetch items from the Django API on component mount
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINT);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINT}${itemId}/`);
      console.log('Item deleted successfully:', response.data);
      fetchItems(); // Fetch items again after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        // Update existing item
        const response = await apiClient.put(`${API_ENDPOINT}${editingItem.id}/`, editingItem);
        console.log('Item updated successfully:', response.data);
      } else {
        // Create new item
        const newItem = {
          // Add other fields as needed
        };
        const response = await apiClient.post(API_ENDPOINT, newItem);
        console.log('New item added successfully:', response.data);
      }

      fetchItems(); // Fetch items again after saving
      setEditingItem(null); // Clear editing state
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleCancel = () => {
    setEditingItem(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Control and Monitoring Items
      </Typography>

      {/* List of Items */}
      {items.map((item) => (
        <Box key={item.id}>
          {/* Display item fields as needed */}
          <Typography variant="body1">{item.project}</Typography>
          <Typography variant="body1">{item.reports}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(item)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(item.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Item Form */}
      {editingItem && (
        <Box>
          {/* Edit Item Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Reports"
            value={editingItem.reports}
            onChange={(e) => setEditingItem({ ...editingItem, reports: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Item Button */}
      <Button onClick={() => setEditingItem({ reports: '' })}>Add New Item</Button>
    </Box>
  );
};

export default ControlAndMonitoringComponent;
