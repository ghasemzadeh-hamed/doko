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

const LeadComponent = () => {
  // ** State
  const [leads, setLeads] = useState([]);
  const [editingLead, setEditingLead] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // Fetch leads from the Django API on component mount
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await apiClient.get('/Lead/');
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
  };

  const handleDelete = async (leadId) => {
    try {
      const response = await apiClient.delete(`/Lead/${leadId}/`);
      console.log('Lead deleted successfully:', response.data);
      fetchLeads(); // Fetch leads again after deletion
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingLead) {
        // Update existing lead
        const response = await apiClient.put(`/Lead/${editingLead.id}/`, editingLead);
        console.log('Lead updated successfully:', response.data);
      } else {
        // Create new lead
        const newLead = { title: '', source: null, status: null, description: '', is_active: false, probability: null, close_date: null, assigned_to: [] };
        const response = await apiClient.post('/Lead/', newLead);
        console.log('New lead added successfully:', response.data);
      }

      fetchLeads(); // Fetch leads again after saving
      setEditingLead(null); // Clear editing state
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const handleCancel = () => {
    setEditingLead(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Leads
      </Typography>

      {/* Display an alert if needed */}
      {openAlert && (
        <Alert severity="warning" sx={{ '& a': { fontWeight: 400 } }}>
          <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
          {/* Resend Confirmation Link */}
        </Alert>
      )}

      {/* List of Leads */}
      <Grid container spacing={3}>
        {leads.map((lead) => (
          <Grid item key={lead.id}>
            <Box>
              <Typography variant="h6">{lead.title}</Typography>
              <Typography variant="body1">Source: {lead.source}</Typography>
              <Typography variant="body1">Status: {lead.status}</Typography>
              <Typography variant="body2">Description: {lead.description}</Typography>
              <Button onClick={() => handleEdit(lead)}>Edit</Button>
              <IconButton onClick={() => handleDelete(lead.id)}>
                <DeleteOutline />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Edit Lead Form */}
      {editingLead && (
        <Box>
          {/* Edit Lead Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Lead Title"
            value={editingLead.title}
            onChange={(e) => setEditingLead({ ...editingLead, title: e.target.value })}
          />
          {/* Add other lead fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Lead Button */}
      <Button onClick={() => setEditingLead({ title: '', source: null, status: null, description: '', is_active: false, probability: null, close_date: null, assigned_to: [] })}>
        Add New Lead
      </Button>
    </Box>
  );
};

export default LeadComponent;
