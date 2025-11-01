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

const API_ENDPOINT = '/Payment/';

// ** Component
const PaymentComponent = () => {
  // ** State
  const [payments, setPayments] = useState([]);
  const [editingPayment, setEditingPayment] = useState(null);

  useEffect(() => {
    // Fetch payments from the Django API on component mount
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINT);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
  };

  const handleDelete = async (paymentId) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINT}${paymentId}/`);
      console.log('Payment deleted successfully:', response.data);
      fetchPayments(); // Fetch payments again after deletion
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingPayment) {
        // Update existing payment
        const response = await apiClient.put(`${API_ENDPOINT}${editingPayment.id}/`, editingPayment);
        console.log('Payment updated successfully:', response.data);
      } else {
        // Create new payment
        const newPayment = {
          // Add other fields as needed
        };
        const response = await apiClient.post(API_ENDPOINT, newPayment);
        console.log('New payment added successfully:', response.data);
      }

      fetchPayments(); // Fetch payments again after saving
      setEditingPayment(null); // Clear editing state
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  const handleCancel = () => {
    setEditingPayment(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payments
      </Typography>

      {/* List of Payments */}
      {payments.map((payment) => (
        <Box key={payment.id}>
          {/* Display payment fields as needed */}
          <Typography variant="body1">{payment.customer}</Typography>
          <Typography variant="body1">{payment.amount}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(payment)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(payment.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Payment Form */}
      {editingPayment && (
        <Box>
          {/* Edit Payment Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Amount"
            value={editingPayment.amount}
            onChange={(e) => setEditingPayment({ ...editingPayment, amount: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Payment Button */}
      <Button onClick={() => setEditingPayment({ amount: '' })}>Add New Payment</Button>
    </Box>
  );
};

export default PaymentComponent;
