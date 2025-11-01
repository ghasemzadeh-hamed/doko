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
const API_ENDPOINT = 'http://localhost:8000/Expense/';

const ExpenseComponent = () => {
  // ** State
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    // Fetch expenses from the Django API on component mount
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = async (expenseId) => {
    try {
      const response = await axios.delete(`${API_ENDPOINT}${expenseId}/`);
      console.log('Expense deleted successfully:', response.data);
      fetchExpenses(); // Fetch expenses again after deletion
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingExpense) {
        // Update existing expense
        const response = await axios.put(`${API_ENDPOINT}${editingExpense.id}/`, editingExpense);
        console.log('Expense updated successfully:', response.data);
      } else {
        // Create new expense
        const newExpense = {
          // Add other fields as needed
        };
        const response = await axios.post(API_ENDPOINT, newExpense);
        console.log('New expense added successfully:', response.data);
      }

      fetchExpenses(); // Fetch expenses again after saving
      setEditingExpense(null); // Clear editing state
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  const handleCancel = () => {
    setEditingExpense(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Expenses
      </Typography>

      {/* List of Expenses */}
      {expenses.map((expense) => (
        <Box key={expense.id}>
          {/* Display expense fields as needed */}
          <Typography variant="body1">{expense.user}</Typography>
          <Typography variant="body1">{expense.amount}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(expense)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(expense.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Expense Form */}
      {editingExpense && (
        <Box>
          {/* Edit Expense Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Amount"
            value={editingExpense.amount}
            onChange={(e) => setEditingExpense({ ...editingExpense, amount: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Expense Button */}
      <Button onClick={() => setEditingExpense({ amount: '' })}>Add New Expense</Button>
    </Box>
  );
};

export default ExpenseComponent;
