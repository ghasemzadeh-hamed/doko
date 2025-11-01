"use client"
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
import axios from 'axios';

const ActivityComponent = () => {
  // ** State
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // Fetch activities from the Django API on component mount
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Activity/');
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
  };

  const handleDelete = async (activityId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/Activity/${activityId}/`);
      console.log('Activity deleted successfully:', response.data);
      fetchActivities(); // Fetch activities again after deletion
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingActivity) {
        // Update existing activity
        const response = await axios.put(`http://localhost:8000/Activity/${editingActivity.id}/`, editingActivity);
        console.log('Activity updated successfully:', response.data);
      } else {
        // Create new activity
        const newActivity = {
          description: '',
          user: null,
        };
        const response = await axios.post('http://localhost:8000/Activity/', newActivity);
        console.log('New activity added successfully:', response.data);
      }

      fetchActivities(); // Fetch activities again after saving
      setEditingActivity(null); // Clear editing state
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  const handleCancel = () => {
    setEditingActivity(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Activities
      </Typography>

      {/* Display an alert if needed */}
      {openAlert && (
        <Alert severity="warning" sx={{ '& a': { fontWeight: 400 } }}>
          <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
          {/* Resend Confirmation Link */}
        </Alert>
      )}

      {/* List of Activities */}
      <Grid container spacing={3}>
        {activities.map((activity) => (
          <Grid item key={activity.id}>
            <Box>
              <Typography variant="body1">{activity.description}</Typography>
              <Button onClick={() => handleEdit(activity)}>Edit</Button>
              <IconButton onClick={() => handleDelete(activity.id)}>
                <DeleteOutline />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Edit Activity Form */}
      {editingActivity && (
        <Box>
          {/* Edit Activity Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Description"
            value={editingActivity.description}
            onChange={(e) => setEditingActivity({ ...editingActivity, description: e.target.value })}
          />
          {/* Add other activity fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Activity Button */}
      <Button onClick={() => setEditingActivity({
        description: '',
        user: null,
      })}>
        Add New Activity
      </Button>
    </Box>
  );
};

export default ActivityComponent;
