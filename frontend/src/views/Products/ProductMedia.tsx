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

const ProductMediaComponent = () => {
  // ** State
  const [productMedia, setProductMedia] = useState([]);
  const [editingProductMedia, setEditingProductMedia] = useState(null);

  useEffect(() => {
    // Fetch product media from the Django API on component mount
    fetchProductMedia();
  }, []);

  const fetchProductMedia = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ProductMedia/');
      setProductMedia(response.data);
    } catch (error) {
      console.error('Error fetching product media:', error);
    }
  };

  const handleEdit = (media) => {
    setEditingProductMedia(media);
  };

  const handleDelete = async (mediaId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/ProductMedia/${mediaId}/`);
      console.log('Product media deleted successfully:', response.data);
      fetchProductMedia(); // Fetch product media again after deletion
    } catch (error) {
      console.error('Error deleting product media:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingProductMedia) {
        // Update existing product media
        const response = await axios.put(`http://localhost:8000/ProductMedia/${editingProductMedia.id}/`, editingProductMedia);
        console.log('Product media updated successfully:', response.data);
      } else {
        // Create new product media
        const newProductMedia = {
          // Add other fields as needed
        };
        const response = await axios.post('http://localhost:8000/ProductMedia/', newProductMedia);
        console.log('New product media added successfully:', response.data);
      }

      fetchProductMedia(); // Fetch product media again after saving
      setEditingProductMedia(null); // Clear editing state
    } catch (error) {
      console.error('Error saving product media:', error);
    }
  };

  const handleCancel = () => {
    setEditingProductMedia(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Product Media
      </Typography>

      {/* List of Product Media */}
      {productMedia.map((media) => (
        <Box key={media.id}>
          <Typography variant="body1">{media.media_type}</Typography>
          <Typography variant="body1">{media.media_content}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(media)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(media.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Product Media Form */}
      {editingProductMedia && (
        <Box>
          {/* Edit Product Media Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Media Type"
            value={editingProductMedia.media_type}
            onChange={(e) => setEditingProductMedia({ ...editingProductMedia, media_type: e.target.value })}
          />
          <input
            type="text"
            placeholder="Media Content"
            value={editingProductMedia.media_content}
            onChange={(e) => setEditingProductMedia({ ...editingProductMedia, media_content: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Product Media Button */}
      <Button onClick={() => setEditingProductMedia({ media_type: '', media_content: '', is_active: true })}>
        Add New Product Media
      </Button>
    </Box>
  );
};

export default ProductMediaComponent;
