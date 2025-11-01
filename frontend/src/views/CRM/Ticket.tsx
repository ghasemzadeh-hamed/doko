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

const TicketComponent = () => {
  // ** State
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // Fetch tickets from the Django API on component mount
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await apiClient.get('/Ticket/');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleDelete = async (ticketId) => {
    try {
      const response = await apiClient.delete(`/Ticket/${ticketId}/`);
      console.log('Ticket deleted successfully:', response.data);
      fetchTickets(); // Fetch tickets again after deletion
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingTicket) {
        // Update existing ticket
        const response = await apiClient.put(`/Ticket/${editingTicket.id}/`, editingTicket);
        console.log('Ticket updated successfully:', response.data);
      } else {
        // Create new ticket
        const newTicket = {
          title: '',
          description: '',
          status: '',
          priority: null,
          user: null,
        };
        const response = await apiClient.post('/Ticket/', newTicket);
        console.log('New ticket added successfully:', response.data);
      }

      fetchTickets(); // Fetch tickets again after saving
      setEditingTicket(null); // Clear editing state
    } catch (error) {
      console.error('Error saving ticket:', error);
    }
  };

  const handleCancel = () => {
    setEditingTicket(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tickets
      </Typography>

      {/* Display an alert if needed */}
      {openAlert && (
        <Alert severity="warning" sx={{ '& a': { fontWeight: 400 } }}>
          <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
          {/* Resend Confirmation Link */}
        </Alert>
      )}

      {/* List of Tickets */}
      <Grid container spacing={3}>
        {tickets.map((ticket) => (
          <Grid item key={ticket.id}>
            <Box>
              <Typography variant="h6">{ticket.title}</Typography>
              <Typography variant="body1">Status: {ticket.status}</Typography>
              <Button onClick={() => handleEdit(ticket)}>Edit</Button>
              <IconButton onClick={() => handleDelete(ticket.id)}>
                <DeleteOutline />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Edit Ticket Form */}
      {editingTicket && (
        <Box>
          {/* Edit Ticket Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Title"
            value={editingTicket.title}
            onChange={(e) => setEditingTicket({ ...editingTicket, title: e.target.value })}
          />
          {/* Add other ticket fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Ticket Button */}
      <Button onClick={() => setEditingTicket({
        title: '',
        description: '',
        status: '',
        priority: null,
        user: null,
      })}>
        Add New Ticket
      </Button>
    </Box>
  );
};

export default TicketComponent;
