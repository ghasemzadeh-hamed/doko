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


// ** Constants
const API_ENDPOINT = '/Income/';

const IncomeComponent = () => {
  // ** State
  const [incomeItems, setIncomeItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    // Fetch income items from the Django API on component mount
    fetchIncomeItems();
  }, []);

  const fetchIncomeItems = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINT);
      setIncomeItems(response.data);
    } catch (error) {
      console.error('Error fetching income items:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINT}${itemId}/`);
      console.log('Income item deleted successfully:', response.data);
      fetchIncomeItems(); // Fetch items again after deletion
    } catch (error) {
      console.error('Error deleting income item:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        // Update existing item
        const response = await apiClient.put(`${API_ENDPOINT}${editingItem.id}/`, editingItem);
        console.log('Income item updated successfully:', response.data);
      } else {
        // Create new item
        const newItem = {
          // Add other fields as needed
        };
        const response = await apiClient.post(API_ENDPOINT, newItem);
        console.log('New income item added successfully:', response.data);
      }

      fetchIncomeItems(); // Fetch items again after saving
      setEditingItem(null); // Clear editing state
    } catch (error) {
      console.error('Error saving income item:', error);
    }
  };

  const handleCancel = () => {
    setEditingItem(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Income Items
      </Typography>

      {/* List of Income Items */}
      {incomeItems.map((item) => (
        <Box key={item.id}>
          {/* Display item fields as needed */}
          <Typography variant="body1">{item.user}</Typography>
          <Typography variant="body1">{item.amount}</Typography>
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
            placeholder="Amount"
            value={editingItem.amount}
            onChange={(e) => setEditingItem({ ...editingItem, amount: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Item Button */}
      <Button onClick={() => setEditingItem({ amount: '' })}>Add New Income Item</Button>
    </Box>
  );
};

export default IncomeComponent;
