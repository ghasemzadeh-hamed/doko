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

const ReminderComponent = () => {
  // ** State
  const [reminders, setReminders] = useState([]);
  const [editingReminder, setEditingReminder] = useState(null);

  useEffect(() => {
    // Fetch reminders from the Django API on component mount
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Reminder/');
      setReminders(response.data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder);
  };

  const handleDelete = async (reminderId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/Reminder/${reminderId}/`);
      console.log('Reminder deleted successfully:', response.data);
      fetchReminders(); // Fetch reminders again after deletion
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingReminder) {
        // Update existing reminder
        const response = await axios.put(`http://localhost:8000/Reminder/${editingReminder.id}/`, editingReminder);
        console.log('Reminder updated successfully:', response.data);
      } else {
        // Create new reminder
        const newReminder = {
          reminder_type: null,
        };
        const response = await axios.post('http://localhost:8000/Reminder/', newReminder);
        console.log('New reminder added successfully:', response.data);
      }

      fetchReminders(); // Fetch reminders again after saving
      setEditingReminder(null); // Clear editing state
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  const handleCancel = () => {
    setEditingReminder(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reminders
      </Typography>

      {/* List of Reminders */}
      {reminders.map((reminder) => (
        <Box key={reminder.id}>
          <Typography variant="body1">{reminder.reminder_type}</Typography>
          <Button onClick={() => handleEdit(reminder)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(reminder.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Reminder Form */}
      {editingReminder && (
        <Box>
          {/* Edit Reminder Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Reminder Type"
            value={editingReminder.reminder_type}
            onChange={(e) => setEditingReminder({ ...editingReminder, reminder_type: e.target.value })}
          />
          {/* Add other reminder fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Reminder Button */}
      <Button onClick={() => setEditingReminder({ reminder_type: null })}>
        Add New Reminder
      </Button>
    </Box>
  );
};

export default ReminderComponent;
