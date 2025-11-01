// ** React Imports
import { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';


// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// ** Icons Imports
import EditOutline from 'mdi-material-ui/PencilOutline';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';

const API_ENDPOINT = '/SellerCommission/';

const SellerCommissionComponent = () => {
  const [sellerCommissions, setSellerCommissions] = useState([]);
  const [editingCommission, setEditingCommission] = useState(null);

  useEffect(() => {
    fetchSellerCommissions();
  }, []);

  const fetchSellerCommissions = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINT);
      setSellerCommissions(response.data);
    } catch (error) {
      console.error('Error fetching seller commissions:', error);
    }
  };

  const handleEdit = (commission) => {
    setEditingCommission(commission);
  };

  const handleDelete = async (commissionId) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINT}${commissionId}/`);
      console.log('Seller commission deleted successfully:', response.data);
      fetchSellerCommissions(); // Fetch items again after deletion
    } catch (error) {
      console.error('Error deleting seller commission:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingCommission) {
        // Update existing commission
        const response = await apiClient.put(`${API_ENDPOINT}${editingCommission.id}/`, editingCommission);
        console.log('Seller commission updated successfully:', response.data);
      } else {
        // Create new commission
        const newCommission = {
          // Add other fields as needed
        };
        const response = await apiClient.post(API_ENDPOINT, newCommission);
        console.log('New seller commission added successfully:', response.data);
      }

      fetchSellerCommissions(); // Fetch items again after saving
      setEditingCommission(null); // Clear editing state
    } catch (error) {
      console.error('Error saving seller commission:', error);
    }
  };

  const handleCancel = () => {
    setEditingCommission(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Seller Commissions
      </Typography>

      {sellerCommissions.map((commission) => (
        <Box key={commission.id}>
          <Typography variant="body1">{commission.seller}</Typography>
          <Typography variant="body1">{commission.commission_percentage}%</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(commission)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(commission.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {editingCommission && (
        <Box>
          {/* Edit Commission Fields */}
          <input
            type="text"
            placeholder="Commission Percentage"
            value={editingCommission.commission_percentage}
            onChange={(e) => setEditingCommission({ ...editingCommission, commission_percentage: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      <Button onClick={() => setEditingCommission({ commission_percentage: '' })}>Add New Commission</Button>
    </Box>
  );
};

export default SellerCommissionComponent;
