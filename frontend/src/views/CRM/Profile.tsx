// ** React Imports
import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Close from 'mdi-material-ui/Close';

// ** Icons Imports
import DeleteOutline from 'mdi-material-ui/DeleteOutline';

// ** API and Axios Imports
import apiClient from 'src/services/apiClient';


// ** Your Custom Address, assuming it's already implemented
// import AddressComponent from './AddressComponent';

const ProfileComponent = () => {
  // ** State
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // Fetch profiles from the Django API on component mount
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await apiClient.get('/Profile/');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
  };

  const handleDelete = async (profileId) => {
    try {
      const response = await apiClient.delete(`/Profile/${profileId}/`);
      console.log('Profile deleted successfully:', response.data);
      fetchProfiles(); // Fetch profiles again after deletion
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingProfile) {
        // Update existing profile
        const response = await apiClient.put(`/Profile/${editingProfile.id}/`, editingProfile);
        console.log('Profile updated successfully:', response.data);
      } else {
        // Create new profile
        const newProfile = { role: 'USER', has_sales_access: false, has_marketing_access: false, has_services_access: false, has_utilities_access: false, is_organization_admin: false, is_active: false, date_of_joining: null, user: null, address: [] };
        const response = await apiClient.post('/Profile/', newProfile);
        console.log('New profile added successfully:', response.data);
      }

      fetchProfiles(); // Fetch profiles again after saving
      setEditingProfile(null); // Clear editing state
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleCancel = () => {
    setEditingProfile(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profiles
      </Typography>

      {/* Display an alert if needed */}
      {openAlert && (
        <Alert severity="warning" sx={{ '& a': { fontWeight: 400 } }}>
          <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
          {/* Resend Confirmation Link */}
        </Alert>
      )}

      {/* List of Profiles */}
      <Grid container spacing={3}>
        {profiles.map((profile) => (
          <Grid item key={profile.id}>
            <Box>
              <Typography variant="h6">{profile.user ? profile.user.phone_number : 'No User'}</Typography>
              <Typography variant="body1">Role: {profile.role}</Typography>
              {/* Add more fields as needed */}
              <Button onClick={() => handleEdit(profile)}>Edit</Button>
              <IconButton onClick={() => handleDelete(profile.id)}>
                <DeleteOutline />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Edit Profile Form */}
      {editingProfile && (
        <Box>
          {/* Edit Profile Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          {/* Add AddressComponent for the address field if needed */}
          {/* <AddressComponent value={editingProfile.address} onChange={(value) => setEditingProfile({ ...editingProfile, address: value })} /> */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Profile Button */}
      <Button onClick={() => setEditingProfile({})}>Add New Profile</Button>
    </Box>
  );
};

export default ProfileComponent;
