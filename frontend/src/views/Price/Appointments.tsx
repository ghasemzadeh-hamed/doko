// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// ** Icons Imports
import EditOutline from 'mdi-material-ui/PencilOutline';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';

// ** API and Axios Imports
import apiClient from 'src/services/apiClient';

const AppointmentsComponent = () => {
  // ** State
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    // Fetch appointments from the Django API on component mount
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await apiClient.get('/Appointments/');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
  };

  const handleDelete = async (appointmentId) => {
    try {
      const response = await apiClient.delete(`/Appointments/${appointmentId}/`);
      console.log('Appointment deleted successfully:', response.data);
      fetchAppointments(); // Fetch appointments again after deletion
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingAppointment) {
        // Update existing appointment
        const response = await apiClient.put(`/Appointments/${editingAppointment.id}/`, editingAppointment);
        console.log('Appointment updated successfully:', response.data);
      } else {
        // Create new appointment
        const newAppointment = {
          // Add other fields as needed
        };
        const response = await apiClient.post('/Appointments/', newAppointment);
        console.log('New appointment added successfully:', response.data);
      }

      fetchAppointments(); // Fetch appointments again after saving
      setEditingAppointment(null); // Clear editing state
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const handleCancel = () => {
    setEditingAppointment(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>

      {/* List of Appointments */}
      {appointments.map((appointment) => (
        <Box key={appointment.id}>
          <Typography variant="body1">{appointment.service.name}</Typography>
          <Typography variant="body1">{appointment.store.name}</Typography>
          <Typography variant="body1">{appointment.price}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(appointment)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(appointment.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Appointment Form */}
      {editingAppointment && (
        <Box>
          {/* Edit Appointment Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Price"
            value={editingAppointment.price}
            onChange={(e) => setEditingAppointment({ ...editingAppointment, price: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Appointment Button */}
      <Button onClick={() => setEditingAppointment({ price: '' })}>Add New Appointment</Button>
    </Box>
  );
};

export default AppointmentsComponent;
