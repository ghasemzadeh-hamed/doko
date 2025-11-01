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

const ProductPriceComponent = () => {
  // ** State
  const [productPrices, setProductPrices] = useState([]);
  const [editingProductPrice, setEditingProductPrice] = useState(null);

  useEffect(() => {
    // Fetch product prices from the Django API on component mount
    fetchProductPrices();
  }, []);

  const fetchProductPrices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ProductPrice/');
      setProductPrices(response.data);
    } catch (error) {
      console.error('Error fetching product prices:', error);
    }
  };

  const handleEdit = (productPrice) => {
    setEditingProductPrice(productPrice);
  };

  const handleDelete = async (productPriceId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/ProductPrice/${productPriceId}/`);
      console.log('Product price deleted successfully:', response.data);
      fetchProductPrices(); // Fetch product prices again after deletion
    } catch (error) {
      console.error('Error deleting product price:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingProductPrice) {
        // Update existing product price
        const response = await axios.put(`http://localhost:8000/ProductPrice/${editingProductPrice.id}/`, editingProductPrice);
        console.log('Product price updated successfully:', response.data);
      } else {
        // Create new product price
        const newProductPrice = {
          // Add other fields as needed
        };
        const response = await axios.post('http://localhost:8000/ProductPrice/', newProductPrice);
        console.log('New product price added successfully:', response.data);
      }

      fetchProductPrices(); // Fetch product prices again after saving
      setEditingProductPrice(null); // Clear editing state
    } catch (error) {
      console.error('Error saving product price:', error);
    }
  };

  const handleCancel = () => {
    setEditingProductPrice(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Product Prices
      </Typography>

      {/* List of Product Prices */}
      {productPrices.map((productPrice) => (
        <Box key={productPrice.id}>
          <Typography variant="body1">{productPrice.sales_price}</Typography>
          <Typography variant="body1">{productPrice.purchase_price}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(productPrice)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(productPrice.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Product Price Form */}
      {editingProductPrice && (
        <Box>
          {/* Edit Product Price Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Sales Price"
            value={editingProductPrice.sales_price}
            onChange={(e) => setEditingProductPrice({ ...editingProductPrice, sales_price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Purchase Price"
            value={editingProductPrice.purchase_price}
            onChange={(e) => setEditingProductPrice({ ...editingProductPrice, purchase_price: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Product Price Button */}
      <Button onClick={() => setEditingProductPrice({ sales_price: '', purchase_price: '' })}>
        Add New Product Price
      </Button>
    </Box>
  );
};

export default ProductPriceComponent;
