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

const UsersComponent = () => {
  // ** State
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch users from the Django API on component mount
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/customusers/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await apiClient.delete(`/customusers/${userId}/`);
      console.log('User deleted successfully:', response.data);
      fetchUsers(); // Fetch users again after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingUser) {
        // Update existing user
        const response = await apiClient.put(`/customusers/${editingUser.id}/`, editingUser);
        console.log('User updated successfully:', response.data);
      } else {
        // Create new user
        const newUser = {
          phone_number: '',
          activation_key: '',
          is_active: false,
          is_staff: false,
          role: null,

          // Add other fields as needed
        };
        const response = await apiClient.post('/customusers/', newUser);
        console.log('New user added successfully:', response.data);
      }

      fetchUsers(); // Fetch users again after saving
      setEditingUser(null); // Clear editing state
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleCancel = () => {
    setEditingUser(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      {/* List of Users */}
      {users.map((user) => (
        <Box key={user.id}>
          <Typography variant="body1">{user.phone_number}</Typography>
          <Button onClick={() => handleEdit(user)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(user.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit User Form */}
      {editingUser && (
        <Box>
          {/* Edit User Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Phone Number"
            value={editingUser.phone_number}
            onChange={(e) => setEditingUser({ ...editingUser, phone_number: e.target.value })}
          />
          {/* Add other user fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New User Button */}
      <Button onClick={() => setEditingUser({ phone_number: '', activation_key: '', is_active: false, is_staff: false, role: null })}>
        Add New User
      </Button>
    </Box>
  );
};

export default UsersComponent;
