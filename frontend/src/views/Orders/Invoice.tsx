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

const InvoiceComponent = () => {
  // ** State
  const [invoices, setInvoices] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState(null);

  useEffect(() => {
    // Fetch invoices from the Django API on component mount
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/invoices/');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
  };

  const handleDelete = async (invoiceId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/invoices/${invoiceId}/`);
      console.log('Invoice deleted successfully:', response.data);
      fetchInvoices(); // Fetch invoices again after deletion
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingInvoice) {
        // Update existing invoice
        const response = await axios.put(`http://localhost:8000/invoices/${editingInvoice.id}/`, editingInvoice);
        console.log('Invoice updated successfully:', response.data);
      } else {
        // Create new invoice
        const newInvoice = {
          // Add other fields as needed
        };
        const response = await axios.post('http://localhost:8000/invoices/', newInvoice);
        console.log('New invoice added successfully:', response.data);
      }

      fetchInvoices(); // Fetch invoices again after saving
      setEditingInvoice(null); // Clear editing state
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  const handleCancel = () => {
    setEditingInvoice(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Invoices
      </Typography>

      {/* List of Invoices */}
      {invoices.map((invoice) => (
        <Box key={invoice.id}>
          {/* Display other fields as needed */}
          <Typography variant="body1">{invoice.title}</Typography>
          <Button onClick={() => handleEdit(invoice)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(invoice.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Invoice Form */}
      {editingInvoice && (
        <Box>
          {/* Edit Invoice Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Invoice Title"
            value={editingInvoice.title}
            onChange={(e) => setEditingInvoice({ ...editingInvoice, title: e.target.value })}
          />
          {/* Add other invoice fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Invoice Button */}
      <Button onClick={() => setEditingInvoice({ title: '' })}>
        Add New Invoice
      </Button>
    </Box>
  );
};

export default InvoiceComponent;
