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

const InvoiceHistoryComponent = () => {
  // ** State
  const [invoiceHistories, setInvoiceHistories] = useState([]);
  const [editingInvoiceHistory, setEditingInvoiceHistory] = useState(null);

  useEffect(() => {
    // Fetch invoice histories from the Django API on component mount
    fetchInvoiceHistories();
  }, []);

  const fetchInvoiceHistories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/InvoiceHistory/');
      setInvoiceHistories(response.data);
    } catch (error) {
      console.error('Error fetching invoice histories:', error);
    }
  };

  const handleEdit = (invoiceHistory) => {
    setEditingInvoiceHistory(invoiceHistory);
  };

  const handleDelete = async (invoiceHistoryId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/InvoiceHistory/${invoiceHistoryId}/`);
      console.log('Invoice history deleted successfully:', response.data);
      fetchInvoiceHistories(); // Fetch invoice histories again after deletion
    } catch (error) {
      console.error('Error deleting invoice history:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingInvoiceHistory) {
        // Update existing invoice history
        const response = await axios.put(`http://localhost:8000/InvoiceHistory/${editingInvoiceHistory.id}/`, editingInvoiceHistory);
        console.log('Invoice history updated successfully:', response.data);
      } else {
        // Create new invoice history
        const newInvoiceHistory = {
          // Add other fields as needed
        };
        const response = await axios.post('http://localhost:8000/InvoiceHistory/', newInvoiceHistory);
        console.log('New invoice history added successfully:', response.data);
      }

      fetchInvoiceHistories(); // Fetch invoice histories again after saving
      setEditingInvoiceHistory(null); // Clear editing state
    } catch (error) {
      console.error('Error saving invoice history:', error);
    }
  };

  const handleCancel = () => {
    setEditingInvoiceHistory(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Invoice Histories
      </Typography>

      {/* List of Invoice Histories */}
      {invoiceHistories.map((invoiceHistory) => (
        <Box key={invoiceHistory.id}>
          {/* Display other fields as needed */}
          <Typography variant="body1">{invoiceHistory.title}</Typography>
          <Button onClick={() => handleEdit(invoiceHistory)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(invoiceHistory.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Invoice History Form */}
      {editingInvoiceHistory && (
        <Box>
          {/* Edit Invoice History Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Invoice Title"
            value={editingInvoiceHistory.title}
            onChange={(e) => setEditingInvoiceHistory({ ...editingInvoiceHistory, title: e.target.value })}
          />
          {/* Add other invoice history fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Invoice History Button */}
      <Button onClick={() => setEditingInvoiceHistory({ title: '' })}>
        Add New Invoice History
      </Button>
    </Box>
  );
};

export default InvoiceHistoryComponent;
