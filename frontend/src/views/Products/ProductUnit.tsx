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

const ProductUnitComponent = () => {
  // ** State
  const [productUnits, setProductUnits] = useState([]);
  const [editingProductUnit, setEditingProductUnit] = useState(null);

  useEffect(() => {
    // Fetch product units from the Django API on component mount
    fetchProductUnits();
  }, []);

  const fetchProductUnits = async () => {
    try {
      const response = await apiClient.get('/ProductUnit/');
      setProductUnits(response.data);
    } catch (error) {
      console.error('Error fetching product units:', error);
    }
  };

  const handleEdit = (productUnit) => {
    setEditingProductUnit(productUnit);
  };

  const handleDelete = async (productUnitId) => {
    try {
      const response = await apiClient.delete(`/ProductUnit/${productUnitId}/`);
      console.log('Product unit deleted successfully:', response.data);
      fetchProductUnits(); // Fetch product units again after deletion
    } catch (error) {
      console.error('Error deleting product unit:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingProductUnit) {
        // Update existing product unit
        const response = await apiClient.put(`/ProductUnit/${editingProductUnit.id}/`, editingProductUnit);
        console.log('Product unit updated successfully:', response.data);
      } else {
        // Create new product unit
        const newProductUnit = {
          // Add other fields as needed
        };
        const response = await apiClient.post('/ProductUnit/', newProductUnit);
        console.log('New product unit added successfully:', response.data);
      }

      fetchProductUnits(); // Fetch product units again after saving
      setEditingProductUnit(null); // Clear editing state
    } catch (error) {
      console.error('Error saving product unit:', error);
    }
  };

  const handleCancel = () => {
    setEditingProductUnit(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Product Units
      </Typography>

      {/* List of Product Units */}
      {productUnits.map((productUnit) => (
        <Box key={productUnit.id}>
          {/* Display other fields as needed */}
          <Typography variant="body1">{productUnit.status}</Typography>
          <Typography variant="body1">{productUnit.quantity}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(productUnit)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(productUnit.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Product Unit Form */}
      {editingProductUnit && (
        <Box>
          {/* Edit Product Unit Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Status"
            value={editingProductUnit.status}
            onChange={(e) => setEditingProductUnit({ ...editingProductUnit, status: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={editingProductUnit.quantity}
            onChange={(e) => setEditingProductUnit({ ...editingProductUnit, quantity: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Product Unit Button */}
      <Button onClick={() => setEditingProductUnit({ status: '', quantity: '' })}>Add New Product Unit</Button>
    </Box>
  );
};

export default ProductUnitComponent;
