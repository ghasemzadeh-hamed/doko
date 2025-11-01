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

const CustomerComponent = () => {
  // ** State
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    // Fetch customers from the Django API on component mount
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/customers/');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  const handleDelete = async (customerId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/customers/${customerId}/`);
      console.log('Customer deleted successfully:', response.data);
      fetchCustomers(); // Fetch customers again after deletion
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingCustomer) {
        // Update existing customer
        const response = await axios.put(`http://localhost:8000/customers/${editingCustomer.id}/`, editingCustomer);
        console.log('Customer updated successfully:', response.data);
      } else {
        // Create new customer
        const newCustomer = {
          phone_number: '', // Add other fields as needed
        };
        const response = await axios.post('http://localhost:8000/customers/', newCustomer);
        console.log('New customer added successfully:', response.data);
      }

      fetchCustomers(); // Fetch customers again after saving
      setEditingCustomer(null); // Clear editing state
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleCancel = () => {
    setEditingCustomer(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>

      {/* List of Customers */}
      {customers.map((customer) => (
        <Box key={customer.id}>
          <Typography variant="body1">{customer.phone_number}</Typography>
          <Button onClick={() => handleEdit(customer)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(customer.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Customer Form */}
      {editingCustomer && (
        <Box>
          {/* Edit Customer Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Phone Number"
            value={editingCustomer.phone_number}
            onChange={(e) => setEditingCustomer({ ...editingCustomer, phone_number: e.target.value })}
          />
          {/* Add other customer fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Customer Button */}
      <Button onClick={() => setEditingCustomer({ phone_number: '' })}>
        Add New Customer
      </Button>
    </Box>
  );
};

export default CustomerComponent;
