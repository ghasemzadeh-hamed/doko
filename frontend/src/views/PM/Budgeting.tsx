// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// ** Icons Imports
import EditOutline from 'mdi-material-ui/PencilOutline';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';

// ** Axios Import
import apiClient from 'src/services/apiClient';


// ** Budgeting Component
const BudgetingComponent = () => {
  // ** State
  const [budgetItems, setBudgetItems] = useState([]);
  const [editingBudgetItem, setEditingBudgetItem] = useState(null);

  useEffect(() => {
    // Fetch budget items from the Django API on component mount
    fetchBudgetItems();
  }, []);

  const fetchBudgetItems = async () => {
    try {
      const response = await apiClient.get('/Budgeting/');
      setBudgetItems(response.data);
    } catch (error) {
      console.error('Error fetching budget items:', error);
    }
  };

  const handleEdit = (budgetItem) => {
    setEditingBudgetItem(budgetItem);
  };

  const handleDelete = async (budgetItemId) => {
    try {
      await apiClient.delete(`${'/Budgeting/'}${budgetItemId}/`);
      console.log('Budget item deleted successfully');
      fetchBudgetItems(); // Fetch budget items again after deletion
    } catch (error) {
      console.error('Error deleting budget item:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingBudgetItem) {
        // Update existing budget item
        await apiClient.put(`${'/Budgeting/'}${editingBudgetItem.id}/`, editingBudgetItem);
        console.log('Budget item updated successfully');
      } else {
        // Create new budget item
        const newBudgetItem = {
          // Add other fields as needed
        };
        await apiClient.post(API_ENDPOINT, newBudgetItem);
        console.log('New budget item added successfully');
      }

      fetchBudgetItems(); // Fetch budget items again after saving
      setEditingBudgetItem(null); // Clear editing state
    } catch (error) {
      console.error('Error saving budget item:', error);
    }
  };

  const handleCancel = () => {
    setEditingBudgetItem(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Budget Items
      </Typography>

      {/* List of Budget Items */}
      {budgetItems.map((budgetItem) => (
        <Box key={budgetItem.id}>
          {/* Display budget item details */}
          <Typography variant="body1">{budgetItem.project}</Typography>
          <Typography variant="body1">{budgetItem.budget_items}</Typography>
          {/* Add more fields here */}

          {/* Edit and Delete Buttons */}
          <Button onClick={() => handleEdit(budgetItem)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(budgetItem.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Budget Item Form */}
      {editingBudgetItem && (
        <Box>
          {/* Edit Budget Item Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Project"
            value={editingBudgetItem.project}
            onChange={(e) => setEditingBudgetItem({ ...editingBudgetItem, project: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Budget Item Button */}
      <Button onClick={() => setEditingBudgetItem({ project: '', budget_items: '' })}>Add New Budget Item</Button>
    </Box>
  );
};

export default BudgetingComponent;
