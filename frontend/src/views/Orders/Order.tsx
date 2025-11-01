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

const OrderComponent = () => {
  // ** State
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    // Fetch orders from the Django API on component mount
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/orders/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await apiClient.delete(`/orders/${orderId}/`);
      console.log('Order deleted successfully:', response.data);
      fetchOrders(); // Fetch orders again after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingOrder) {
        // Update existing order
        const response = await apiClient.put(`/orders/${editingOrder.id}/`, editingOrder);
        console.log('Order updated successfully:', response.data);
      } else {
        // Create new order
        const newOrder = {
          // Add other fields as needed
        };
        const response = await apiClient.post('/orders/', newOrder);
        console.log('New order added successfully:', response.data);
      }

      fetchOrders(); // Fetch orders again after saving
      setEditingOrder(null); // Clear editing state
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const handleCancel = () => {
    setEditingOrder(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>

      {/* List of Orders */}
      {orders.map((order) => (
        <Box key={order.id}>
          {/* Display other fields as needed */}
          <Typography variant="body1">{order.title}</Typography>
          <Typography variant="body1">{order.number}</Typography>
          <Typography variant="body1">{order.status}</Typography>
          <Typography variant="body1">{order.payment_status}</Typography>
          <Button onClick={() => handleEdit(order)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(order.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Order Form */}
      {editingOrder && (
        <Box>
          {/* Edit Order Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Title"
            value={editingOrder.title}
            onChange={(e) => setEditingOrder({ ...editingOrder, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Number"
            value={editingOrder.number}
            onChange={(e) => setEditingOrder({ ...editingOrder, number: e.target.value })}
          />
          <input
            type="text"
            placeholder="Status"
            value={editingOrder.status}
            onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
          />
          <input
            type="text"
            placeholder="Payment Status"
            value={editingOrder.payment_status}
            onChange={(e) => setEditingOrder({ ...editingOrder, payment_status: e.target.value })}
          />
          {/* Add other order fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Order Button */}
      <Button onClick={() => setEditingOrder({ title: '', number: '', status: null, payment_status: null })}>
        Add New Order
      </Button>
    </Box>
  );
};

export default OrderComponent;
