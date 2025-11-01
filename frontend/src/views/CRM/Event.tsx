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

const EventComponent = () => {
  // ** State
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // Fetch events from the Django API on component mount
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await apiClient.get('/Event/');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await apiClient.delete(`/Event/${eventId}/`);
      console.log('Event deleted successfully:', response.data);
      fetchEvents(); // Fetch events again after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingEvent) {
        // Update existing event
        const response = await apiClient.put(`/Event/${editingEvent.id}/`, editingEvent);
        console.log('Event updated successfully:', response.data);
      } else {
        // Create new event
        const newEvent = {
          name: '',
          event_type: null,
          status: null,
          start_date: null,
          start_time: null,
          end_date: null,
          end_time: null,
          description: '',
          is_active: false,
          disabled: false,
          date_of_meeting: null,
          created_by: null,
          org: null,
          contacts: [],
          assigned_to: [],
          teams: [],
          tags: [],
        };
        const response = await apiClient.post('/Event/', newEvent);
        console.log('New event added successfully:', response.data);
      }

      fetchEvents(); // Fetch events again after saving
      setEditingEvent(null); // Clear editing state
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleCancel = () => {
    setEditingEvent(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>

      {/* Display an alert if needed */}
      {openAlert && (
        <Alert severity="warning" sx={{ '& a': { fontWeight: 400 } }}>
          <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
          {/* Resend Confirmation Link */}
        </Alert>
      )}

      {/* List of Events */}
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item key={event.id}>
            <Box>
              <Typography variant="body1">{event.name}</Typography>
              <Button onClick={() => handleEdit(event)}>Edit</Button>
              <IconButton onClick={() => handleDelete(event.id)}>
                <DeleteOutline />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Edit Event Form */}
      {editingEvent && (
        <Box>
          {/* Edit Event Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Event Name"
            value={editingEvent.name}
            onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
          />
          {/* Add other event fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Event Button */}
      <Button onClick={() => setEditingEvent({
        name: '',
        event_type: null,
        status: null,
        start_date: null,
        start_time: null,
        end_date: null,
        end_time: null,
        description: '',
        is_active: false,
        disabled: false,
        date_of_meeting: null,
        created_by: null,
        org: null,
        contacts: [],
        assigned_to: [],
        teams: [],
        tags: [],
      })}>
        Add New Event
      </Button>
    </Box>
  );
};

export default EventComponent;
