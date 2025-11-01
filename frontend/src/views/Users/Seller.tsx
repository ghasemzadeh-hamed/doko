// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// ** Icons Imports
import EditOutline from 'mdi-material-ui/PencilOutline';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';

// ** API and Axios Imports
import axios from 'axios';

const SellerComponent = () => {
  // ** State
  const [sellers, setSellers] = useState([]);
  const [editingSeller, setEditingSeller] = useState(null);

  useEffect(() => {
    // Fetch sellers from the Django API on component mount
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/sellers/');
      setSellers(response.data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  const handleEdit = (seller) => {
    setEditingSeller(seller);
  };

  const handleDelete = async (sellerId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/sellers/${sellerId}/`);
      console.log('Seller deleted successfully:', response.data);
      fetchSellers(); // Fetch sellers again after deletion
    } catch (error) {
      console.error('Error deleting seller:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingSeller) {
        // Update existing seller
        const response = await axios.put(`http://localhost:8000/sellers/${editingSeller.id}/`, editingSeller);
        console.log('Seller updated successfully:', response.data);
      } else {
        // Create new seller
        const newSeller = {
          phone_number: '',
          // Add other fields as needed
        };
        const response = await axios.post('http://localhost:8000/sellers/', newSeller);
        console.log('New seller added successfully:', response.data);
      }

      fetchSellers(); // Fetch sellers again after saving
      setEditingSeller(null); // Clear editing state
    } catch (error) {
      console.error('Error saving seller:', error);
    }
  };

  const handleCancel = () => {
    setEditingSeller(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sellers
      </Typography>

      {/* List of Sellers */}
      {sellers.map((seller) => (
        <Box key={seller.id}>
          <Typography variant="body1">{seller.phone_number}</Typography>
          <Button onClick={() => handleEdit(seller)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(seller.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Seller Form */}
      {editingSeller && (
        <Box>
          {/* Edit Seller Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Phone Number"
            value={editingSeller.phone_number}
            onChange={(e) => setEditingSeller({ ...editingSeller, phone_number: e.target.value })}
          />
          {/* Add other seller fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Seller Button */}
      <Button onClick={() => setEditingSeller({ phone_number: '' })}>
        Add New Seller
      </Button>
    </Box>
  );
};

export default SellerComponent;
