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

const ProductComponent = () => {
  // ** State
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Fetch products from the Django API on component mount
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/products/${productId}/`);
      console.log('Product deleted successfully:', response.data);
      fetchProducts(); // Fetch products again after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingProduct) {
        // Update existing product
        const response = await axios.put(`http://localhost:8000/products/${editingProduct.id}/`, editingProduct);
        console.log('Product updated successfully:', response.data);
      } else {
        // Create new product
        const newProduct = {
          // Add other fields as needed
        };
        const response = await axios.post('http://localhost:8000/products/', newProduct);
        console.log('New product added successfully:', response.data);
      }

      fetchProducts(); // Fetch products again after saving
      setEditingProduct(null); // Clear editing state
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {/* List of Products */}
      {products.map((product) => (
        <Box key={product.id}>
          {/* Display other fields as needed */}
          <Typography variant="body1">{product.unique_code}</Typography>
          <Typography variant="body1">{product.name}</Typography>
          <Typography variant="body1">{product.category}</Typography>
          <Typography variant="body1">{product.barcode}</Typography>
          <Typography variant="body1">{product.max_c}</Typography>
          <Typography variant="body1">{product.is_active ? 'Active' : 'Inactive'}</Typography>
          <Button onClick={() => handleEdit(product)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(product.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Product Form */}
      {editingProduct && (
        <Box>
          {/* Edit Product Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Unique Code"
            value={editingProduct.unique_code}
            onChange={(e) => setEditingProduct({ ...editingProduct, unique_code: e.target.value })}
          />
          <input
            type="text"
            placeholder="Name"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={editingProduct.category}
            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Barcode"
            value={editingProduct.barcode}
            onChange={(e) => setEditingProduct({ ...editingProduct, barcode: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max C"
            value={editingProduct.max_c}
            onChange={(e) => setEditingProduct({ ...editingProduct, max_c: e.target.value })}
          />
          <label>
            Is Active:
            <input
              type="checkbox"
              checked={editingProduct.is_active}
              onChange={(e) => setEditingProduct({ ...editingProduct, is_active: e.target.checked })}
            />
          </label>

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Product Button */}
      <Button onClick={() => setEditingProduct({ unique_code: '', name: '', category: '', barcode: '', max_c: null, is_active: false })}>
        Add New Product
      </Button>
    </Box>
  );
};

export default ProductComponent;
