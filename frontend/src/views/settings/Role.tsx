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

const RoleComponent = () => {
  // ** State
  const [roles, setRoles] = useState([]);
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    // Fetch roles from the Django API on component mount
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Role/');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleEdit = (role) => {
    setEditingRole(role);
  };

  const handleDelete = async (roleId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/Role/${roleId}/`);
      console.log('Role deleted successfully:', response.data);
      fetchRoles(); // Fetch roles again after deletion
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingRole) {
        // Update existing role
        const response = await axios.put(`http://localhost:8000/Role/${editingRole.id}/`, editingRole);
        console.log('Role updated successfully:', response.data);
      } else {
        // Create new role
        const newRole = {
          name: '',
          // Add other fields as needed
        };
        const response = await axios.post('http://localhost:8000/Role/', newRole);
        console.log('New role added successfully:', response.data);
      }

      fetchRoles(); // Fetch roles again after saving
      setEditingRole(null); // Clear editing state
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const handleCancel = () => {
    setEditingRole(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Roles
      </Typography>

      {/* List of Roles */}
      {roles.map((role) => (
        <Box key={role.id}>
          <Typography variant="body1">{role.name}</Typography>
          <Typography variant="body2">{role.slug}</Typography>
          <Button onClick={() => handleEdit(role)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(role.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Role Form */}
      {editingRole && (
        <Box>
          {/* Edit Role Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Role Name"
            value={editingRole.name}
            onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
          />
          {/* Add other role fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Role Button */}
      <Button onClick={() => setEditingRole({ name: '', slug: '' })}>
        Add New Role
      </Button>
    </Box>
  );
};

export default RoleComponent;
