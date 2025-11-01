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

const ProductDetailComponent = () => {
  // ** State
  const [productDetails, setProductDetails] = useState([]);
  const [productDetailNames, setProductDetailNames] = useState([]);
  const [editingProductDetail, setEditingProductDetail] = useState(null);

  useEffect(() => {
    // Fetch product details and names from the Django API on component mount
    fetchProductDetails();
    fetchProductDetailNames();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ProductDetail/');
      setProductDetails(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const fetchProductDetailNames = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ProductDetailName/');
      setProductDetailNames(response.data);
    } catch (error) {
      console.error('Error fetching product detail names:', error);
    }
  };

  const handleEdit = (productDetail) => {
    setEditingProductDetail(productDetail);
  };

  const handleDelete = async (productDetailId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/ProductDetail/${productDetailId}/`);
      console.log('Product detail deleted successfully:', response.data);
      fetchProductDetails(); // Fetch product details again after deletion
    } catch (error) {
      console.error('Error deleting product detail:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingProductDetail) {
        // Update existing product detail
        const response = await axios.put(`http://localhost:8000/ProductDetail/${editingProductDetail.id}/`, editingProductDetail);
        console.log('Product detail updated successfully:', response.data);
      } else {
        // Create new product detail
        const newProductDetail = {
          // Add other fields as needed
        };
        const response = await axios.post('http://localhost:8000/ProductDetail/', newProductDetail);
        console.log('New product detail added successfully:', response.data);
      }

      fetchProductDetails(); // Fetch product details again after saving
      setEditingProductDetail(null); // Clear editing state
    } catch (error) {
      console.error('Error saving product detail:', error);
    }
  };

  const handleCancel = () => {
    setEditingProductDetail(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>

      {/* List of Product Details */}
      {productDetails.map((productDetail) => (
        <Box key={productDetail.id}>
          {/* Display other fields as needed */}
          <Typography variant="body1">{productDetail.info}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(productDetail)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(productDetail.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Product Detail Form */}
      {editingProductDetail && (
        <Box>
          {/* Edit Product Detail Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Info"
            value={editingProductDetail.info}
            onChange={(e) => setEditingProductDetail({ ...editingProductDetail, info: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Product Detail Button */}
      <Button onClick={() => setEditingProductDetail({ info: '', subject: null })}>Add New Product Detail</Button>

      {/* List of Product Detail Names */}
      <Typography variant="h4" gutterBottom>
        Product Detail Names
      </Typography>

      {productDetailNames.map((productDetailName) => (
        <Box key={productDetailName.id}>
          <Typography variant="body1">{productDetailName.subject_name}</Typography>
          <Typography variant="body1">{productDetailName.info}</Typography>
          {/* Add more fields here */}
        </Box>
      ))}
    </Box>
  );
};

export default ProductDetailComponent;
