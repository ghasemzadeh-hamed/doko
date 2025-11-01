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
import axios from 'axios';

const StoreItemComponent = () => {
  // ** State
  const [storeItems, setStoreItems] = useState([]);
  const [editingStoreItem, setEditingStoreItem] = useState(null);

  useEffect(() => {
    // Fetch store items from the Django API on component mount
    fetchStoreItems();
  }, []);

  const fetchStoreItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/StoreItem/');
      setStoreItems(response.data);
    } catch (error) {
      console.error('Error fetching store items:', error);
    }
  };

  const handleEdit = (storeItem) => {
    setEditingStoreItem(storeItem);
  };

  const handleDelete = async (storeItemId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/StoreItem/${storeItemId}/`);
      console.log('Store item deleted successfully:', response.data);
      fetchStoreItems(); // Fetch store items again after deletion
    } catch (error) {
      console.error('Error deleting store item:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingStoreItem) {
        // Update existing store item
        const response = await axios.put(`http://localhost:8000/StoreItem/${editingStoreItem.id}/`, editingStoreItem);
        console.log('Store item updated successfully:', response.data);
      } else {
        // Create new store item
        const newStoreItem = {
          // Add other fields as needed
        };
        const response = await axios.post('http://localhost:8000/StoreItem/', newStoreItem);
        console.log('New store item added successfully:', response.data);
      }

      fetchStoreItems(); // Fetch store items again after saving
      setEditingStoreItem(null); // Clear editing state
    } catch (error) {
      console.error('Error saving store item:', error);
    }
  };

  const handleCancel = () => {
    setEditingStoreItem(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Store Items
      </Typography>

      {/* List of Store Items */}
      {storeItems.map((storeItem) => (
        <Box key={storeItem.id}>
          {/* Display other fields as needed */}
          <Typography variant="body1">{storeItem.name}</Typography>
          <Button onClick={() => handleEdit(storeItem)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(storeItem.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Store Item Form */}
      {editingStoreItem && (
        <Box>
          {/* Edit Store Item Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Store Item Name"
            value={editingStoreItem.name}
            onChange={(e) => setEditingStoreItem({ ...editingStoreItem, name: e.target.value })}
          />
          {/* Add other store item fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Store Item Button */}
      <Button onClick={() => setEditingStoreItem({ name: '' })}>
        Add New Store Item
      </Button>
    </Box>
  );
};

export default StoreItemComponent;
