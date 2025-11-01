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

const InventoryComponent = () => {
  // ** State
  const [inventory, setInventory] = useState([]);
  const [editingInventory, setEditingInventory] = useState(null);

  useEffect(() => {
    // Fetch inventory from the Django API on component mount
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await apiClient.get('/Inventory/');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleEdit = (inventoryItem) => {
    setEditingInventory(inventoryItem);
  };

  const handleDelete = async (inventoryItemId) => {
    try {
      const response = await apiClient.delete(`/Inventory/${inventoryItemId}/`);
      console.log('Inventory item deleted successfully:', response.data);
      fetchInventory(); // Fetch inventory again after deletion
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingInventory) {
        // Update existing inventory item
        const response = await apiClient.put(`/Inventory/${editingInventory.id}/`, editingInventory);
        console.log('Inventory item updated successfully:', response.data);
      } else {
        // Create new inventory item
        const newInventoryItem = {
          // Add other fields as needed
        };
        const response = await apiClient.post('/Inventory/', newInventoryItem);
        console.log('New inventory item added successfully:', response.data);
      }

      fetchInventory(); // Fetch inventory again after saving
      setEditingInventory(null); // Clear editing state
    } catch (error) {
      console.error('Error saving inventory item:', error);
    }
  };

  const handleCancel = () => {
    setEditingInventory(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Inventory
      </Typography>

      {/* List of Inventory Items */}
      {inventory.map((inventoryItem) => (
        <Box key={inventoryItem.id}>
          {/* Display other fields as needed */}
          <Typography variant="body1">{inventoryItem.id}</Typography>
          <Button onClick={() => handleEdit(inventoryItem)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(inventoryItem.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Inventory Form */}
      {editingInventory && (
        <Box>
          {/* Edit Inventory Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Inventory ID"
            value={editingInventory.id}
            onChange={(e) => setEditingInventory({ ...editingInventory, id: e.target.value })}
          />
          {/* Add other inventory fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Inventory Item Button */}
      <Button onClick={() => setEditingInventory({ id: '' })}>
        Add New Inventory Item
      </Button>
    </Box>
  );
};

export default InventoryComponent;
