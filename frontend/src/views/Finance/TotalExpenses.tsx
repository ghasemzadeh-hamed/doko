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

const API_ENDPOINT = 'http://localhost:8000/TotalExpenses/';

const TotalExpensesComponent = () => {
  // ** State
  const [totalExpensesList, setTotalExpensesList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    // Fetch total expenses from the Django API on component mount
    fetchTotalExpensesList();
  }, []);

  const fetchTotalExpensesList = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setTotalExpensesList(response.data);
    } catch (error) {
      console.error('Error fetching total expenses:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${API_ENDPOINT}${itemId}/`);
      console.log('Total expenses item deleted successfully');
      fetchTotalExpensesList(); // Fetch items again after deletion
    } catch (error) {
      console.error('Error deleting total expenses item:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        // Update existing item
        await axios.put(`${API_ENDPOINT}${editingItem.id}/`, editingItem);
        console.log('Total expenses item updated successfully');
      } else {
        // Create new item
        const newItem = {
          // Add other fields as needed
          user: 1, // Replace with the actual user ID
          expenses: 0,
        };
        await axios.post(API_ENDPOINT, newItem);
        console.log('New total expenses item added successfully');
      }

      fetchTotalExpensesList(); // Fetch items again after saving
      setEditingItem(null); // Clear editing state
    } catch (error) {
      console.error('Error saving total expenses item:', error);
    }
  };

  const handleCancel = () => {
    setEditingItem(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Total Expenses List
      </Typography>

      {/* List of Total Expenses Items */}
      {totalExpensesList.map((item) => (
        <Box key={item.id}>
          {/* Display item fields as needed */}
          <Typography variant="body1">{item.user}</Typography>
          <Typography variant="body1">{item.expenses}</Typography>
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
            placeholder="Expenses"
            value={editingItem.expenses}
            onChange={(e) => setEditingItem({ ...editingItem, expenses: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Item Button */}
      <Button onClick={() => setEditingItem({ expenses: 0 })}>Add New Total Expenses Item</Button>
    </Box>
  );
};

export default TotalExpensesComponent;
