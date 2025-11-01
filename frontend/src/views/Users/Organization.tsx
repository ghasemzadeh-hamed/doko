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
import apiClient from 'src/services/apiClient';

const OrganizationComponent = () => {
  // ** State
  const [organizations, setOrganizations] = useState([]);
  const [editingOrganization, setEditingOrganization] = useState(null);

  useEffect(() => {
    // Fetch organizations from the Django API on component mount
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await apiClient.get('/managers/');
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  const handleEdit = (organization) => {
    setEditingOrganization(organization);
  };

  const handleUpdate = async () => {
    try {
      // Update existing organization
      const response = await apiClient.put(`/managers/${editingOrganization.id}/`, editingOrganization);
      console.log('Organization updated successfully:', response.data);

      fetchOrganizations(); // Fetch organizations again after updating
      setEditingOrganization(null); // Clear editing state
    } catch (error) {
      console.error('Error updating organization:', error);
    }
  };

  const handleDelete = async (organizationId) => {
    try {
      const response = await apiClient.delete(`/managers/${organizationId}/`);
      console.log('Organization deleted successfully:', response.data);
      fetchOrganizations(); // Fetch organizations again after deletion
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Organizations
      </Typography>

      {/* List of Organizations */}
      {organizations.map((organization) => (
        <Box key={organization.id}>
          <Typography variant="body1">{organization.name}</Typography>
          <Button onClick={() => handleEdit(organization)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(organization.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Organization Form */}
      {editingOrganization && (
        <Box>
          {/* Edit Organization Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Organization Name"
            value={editingOrganization.name}
            onChange={(e) => setEditingOrganization({ ...editingOrganization, name: e.target.value })}
          />
          {/* Add other organization fields as needed */}

          {/* Update and Cancel Buttons */}
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={() => setEditingOrganization(null)}>Cancel</Button>
        </Box>
      )}
    </Box>
  );
};

export default OrganizationComponent;
