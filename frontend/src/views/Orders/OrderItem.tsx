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

const OrderItemComponent = () => {
  // ** State
  const [orderItems, setOrderItems] = useState([]);
  const [editingOrderItem, setEditingOrderItem] = useState(null);

  useEffect(() => {
    // Fetch order items from the Django API on component mount
    fetchOrderItems();
  }, []);

  const fetchOrderItems = async () => {
    try {
      const response = await apiClient.get('/orderitems/');
      setOrderItems(response.data);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  const handleEdit = (orderItem) => {
    setEditingOrderItem(orderItem);
  };

  const handleDelete = async (orderItemId) => {
    try {
      const response = await apiClient.delete(`/orderitems/${orderItemId}/`);
      console.log('Order item deleted successfully:', response.data);
      fetchOrderItems(); // Fetch order items again after deletion
    } catch (error) {
      console.error('Error deleting order item:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingOrderItem) {
        // Update existing order item
        const response = await apiClient.put(`/orderitems/${editingOrderItem.id}/`, editingOrderItem);
        console.log('Order item updated successfully:', response.data);
      } else {
        // Create new order item
        const newOrderItem = {
          // Add other fields as needed
        };
        const response = await apiClient.post('/orderitems/', newOrderItem);
        console.log('New order item added successfully:', response.data);
      }

      fetchOrderItems(); // Fetch order items again after saving
      setEditingOrderItem(null); // Clear editing state
    } catch (error) {
      console.error('Error saving order item:', error);
    }
  };

  const handleCancel = () => {
    setEditingOrderItem(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Order Items
      </Typography>

      {/* List of Order Items */}
      {orderItems.map((orderItem) => (
        <Box key={orderItem.id}>
          {/* Display other fields as needed */}
          <Typography variant="body1">{orderItem.quantity_product_item}</Typography>
          <Button onClick={() => handleEdit(orderItem)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(orderItem.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Order Item Form */}
      {editingOrderItem && (
        <Box>
          {/* Edit Order Item Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="number"
            placeholder="Quantity Product Item"
            value={editingOrderItem.quantity_product_item}
            onChange={(e) => setEditingOrderItem({ ...editingOrderItem, quantity_product_item: parseInt(e.target.value, 10) })}
          />
          {/* Add other order item fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Order Item Button */}
      <Button onClick={() => setEditingOrderItem({ quantity_product_item: null })}>
        Add New Order Item
      </Button>
    </Box>
  );
};

export default OrderItemComponent;
