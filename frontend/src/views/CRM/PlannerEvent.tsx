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

const PlannerEventComponent = () => {
  // ** State
  const [plannerEvents, setPlannerEvents] = useState([]);
  const [editingPlannerEvent, setEditingPlannerEvent] = useState(null);

  useEffect(() => {
    // Fetch planner events from the Django API on component mount
    fetchPlannerEvents();
  }, []);

  const fetchPlannerEvents = async () => {
    try {
      const response = await apiClient.get('/PlannerEvent/');
      setPlannerEvents(response.data);
    } catch (error) {
      console.error('Error fetching planner events:', error);
    }
  };

  const handleEdit = (plannerEvent) => {
    setEditingPlannerEvent(plannerEvent);
  };

  const handleDelete = async (plannerEventId) => {
    try {
      const response = await apiClient.delete(`/PlannerEvent/${plannerEventId}/`);
      console.log('PlannerEvent deleted successfully:', response.data);
      fetchPlannerEvents(); // Fetch planner events again after deletion
    } catch (error) {
      console.error('Error deleting planner event:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingPlannerEvent) {
        // Update existing planner event
        const response = await apiClient.put(`/PlannerEvent/${editingPlannerEvent.id}/`, editingPlannerEvent);
        console.log('PlannerEvent updated successfully:', response.data);
      } else {
        // Create new planner event
        const newPlannerEvent = {
          name: '',

          // Add other fields as needed
        };
        const response = await apiClient.post('/PlannerEvent/', newPlannerEvent);
        console.log('New planner event added successfully:', response.data);
      }

      fetchPlannerEvents(); // Fetch planner events again after saving
      setEditingPlannerEvent(null); // Clear editing state
    } catch (error) {
      console.error('Error saving planner event:', error);
    }
  };

  const handleCancel = () => {
    setEditingPlannerEvent(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Planner Events
      </Typography>

      {/* List of Planner Events */}
      {plannerEvents.map((plannerEvent) => (
        <Box key={plannerEvent.id}>
          <Typography variant="body1">{plannerEvent.name}</Typography>
          <Button onClick={() => handleEdit(plannerEvent)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(plannerEvent.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Planner Event Form */}
      {editingPlannerEvent && (
        <Box>
          {/* Edit Planner Event Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Event Name"
            value={editingPlannerEvent.name}
            onChange={(e) => setEditingPlannerEvent({ ...editingPlannerEvent, name: e.target.value })}
          />
          {/* Add other planner event fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Planner Event Button */}
      <Button onClick={() => setEditingPlannerEvent({ name: '' })}>
        Add New Planner Event
      </Button>
    </Box>
  );
};

export default PlannerEventComponent;
