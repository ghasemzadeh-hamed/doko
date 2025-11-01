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

const API_ENDPOINT = 'http://localhost:8000/TotalIncome/';

const TotalIncomeComponent = () => {
  // ** State
  const [totalIncomes, setTotalIncomes] = useState([]);
  const [editingIncome, setEditingIncome] = useState(null);

  useEffect(() => {
    // Fetch total incomes from the Django API on component mount
    fetchTotalIncomes();
  }, []);

  const fetchTotalIncomes = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setTotalIncomes(response.data);
    } catch (error) {
      console.error('Error fetching total incomes:', error);
    }
  };

  const handleEdit = (income) => {
    setEditingIncome(income);
  };

  const handleDelete = async (incomeId) => {
    try {
      const response = await axios.delete(`${API_ENDPOINT}${incomeId}/`);
      console.log('Total income deleted successfully:', response.data);
      fetchTotalIncomes(); // Fetch incomes again after deletion
    } catch (error) {
      console.error('Error deleting total income:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingIncome) {
        // Update existing income
        const response = await axios.put(`${API_ENDPOINT}${editingIncome.id}/`, editingIncome);
        console.log('Total income updated successfully:', response.data);
      } else {
        // Create new income
        const newIncome = {
          // Add other fields as needed
        };
        const response = await axios.post(API_ENDPOINT, newIncome);
        console.log('New total income added successfully:', response.data);
      }

      fetchTotalIncomes(); // Fetch incomes again after saving
      setEditingIncome(null); // Clear editing state
    } catch (error) {
      console.error('Error saving total income:', error);
    }
  };

  const handleCancel = () => {
    setEditingIncome(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Total Incomes
      </Typography>

      {/* List of Total Incomes */}
      {totalIncomes.map((income) => (
        <Box key={income.id}>
          {/* Display income fields as needed */}
          <Typography variant="body1">{income.user}</Typography>
          <Typography variant="body1">{income.income}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(income)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(income.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Income Form */}
      {editingIncome && (
        <Box>
          {/* Edit Income Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Income"
            value={editingIncome.income}
            onChange={(e) => setEditingIncome({ ...editingIncome, income: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Income Button */}
      <Button onClick={() => setEditingIncome({ income: 0 })}>Add New Total Income</Button>
    </Box>
  );
};

export default TotalIncomeComponent;
