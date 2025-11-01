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


const API_ENDPOINT = 'http://localhost:8000/PaymentMethod/';


const PaymentMethodComponent = () => {
  // ** State
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [editingMethod, setEditingMethod] = useState(null);

  useEffect(() => {
    // Fetch payment methods from the Django API on component mount
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setPaymentMethods(response.data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  const handleEdit = (method) => {
    setEditingMethod(method);
  };

  const handleDelete = async (methodId) => {
    try {
      const response = await axios.delete(`${API_ENDPOINT}${methodId}/`);
      console.log('Payment method deleted successfully:', response.data);
      fetchPaymentMethods(); // Fetch methods again after deletion
    } catch (error) {
      console.error('Error deleting payment method:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingMethod) {
        // Update existing method
        const response = await axios.put(`${API_ENDPOINT}${editingMethod.id}/`, editingMethod);
        console.log('Payment method updated successfully:', response.data);
      } else {
        // Create new method
        const newMethod = {
          // Add other fields as needed
        };
        const response = await axios.post(API_ENDPOINT, newMethod);
        console.log('New payment method added successfully:', response.data);
      }

      fetchPaymentMethods(); // Fetch methods again after saving
      setEditingMethod(null); // Clear editing state
    } catch (error) {
      console.error('Error saving payment method:', error);
    }
  };

  const handleCancel = () => {
    setEditingMethod(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payment Methods
      </Typography>

      {/* List of Payment Methods */}
      {paymentMethods.map((method) => (
        <Box key={method.id}>
          {/* Display method fields as needed */}
          <Typography variant="body1">{method.name}</Typography>
          <Typography variant="body1">{method.description}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(method)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(method.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Method Form */}
      {editingMethod && (
        <Box>
          {/* Edit Method Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Name"
            value={editingMethod.name}
            onChange={(e) => setEditingMethod({ ...editingMethod, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingMethod.description}
            onChange={(e) => setEditingMethod({ ...editingMethod, description: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Method Button */}
      <Button onClick={() => setEditingMethod({ name: '', description: '' })}>Add New Payment Method</Button>
    </Box>
  );
};

export default PaymentMethodComponent;
