// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Close from 'mdi-material-ui/Close';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';

// ** Icons Imports
import EditOutline from 'mdi-material-ui/PencilOutline';

// ** API and Axios Imports
import axios from 'axios';

const OpportunityComponent = () => {
  // ** State
  const [opportunities, setOpportunities] = useState([]);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // Fetch opportunities from the Django API on component mount
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Opportunity/');
      setOpportunities(response.data);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const handleEdit = (opportunity) => {
    setEditingOpportunity(opportunity);
  };

  const handleDelete = async (opportunityId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/Opportunity/${opportunityId}/`);
      console.log('Opportunity deleted successfully:', response.data);
      fetchOpportunities(); // Fetch opportunities again after deletion
    } catch (error) {
      console.error('Error deleting opportunity:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingOpportunity) {
        // Update existing opportunity
        const response = await axios.put(`http://localhost:8000/Opportunity/${editingOpportunity.id}/`, editingOpportunity);
        console.log('Opportunity updated successfully:', response.data);
      } else {
        // Create new opportunity
        const newOpportunity = {
          name: null,
          stage: null,
          amount: null,
          lead_source: null,
          probability: null,
          closed_on: null,
          description: '',
          is_active: false,
          account: null,
          closed_by: null,
          org: null,
          contacts: [],
          assigned_to: [],
          tags: [],
          teams: [],
        };
        const response = await axios.post('http://localhost:8000/Opportunity/', newOpportunity);
        console.log('New opportunity added successfully:', response.data);
      }

      fetchOpportunities(); // Fetch opportunities again after saving
      setEditingOpportunity(null); // Clear editing state
    } catch (error) {
      console.error('Error saving opportunity:', error);
    }
  };

  const handleCancel = () => {
    setEditingOpportunity(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Opportunities
      </Typography>

      {/* Display an alert if needed */}
      {openAlert && (
        <Alert severity="warning" sx={{ '& a': { fontWeight: 400 } }}>
          <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
          {/* Resend Confirmation Link */}
        </Alert>
      )}

      {/* List of Opportunities */}
      <Grid container spacing={3}>
        {opportunities.map((opportunity) => (
          <Grid item key={opportunity.id}>
            <Box>
              <Typography variant="body1">{opportunity.name}</Typography>
              <Button onClick={() => handleEdit(opportunity)}>
                <EditOutline />
                Edit
              </Button>
              <IconButton onClick={() => handleDelete(opportunity.id)}>
                <DeleteOutline />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Edit Opportunity Form */}
      {editingOpportunity && (
        <Box>
          {/* Edit Opportunity Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Opportunity Name"
            value={editingOpportunity.name}
            onChange={(e) => setEditingOpportunity({ ...editingOpportunity, name: e.target.value })}
          />
          {/* Add other opportunity fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Opportunity Button */}
      <Button onClick={() => setEditingOpportunity({
        name: null,
        stage: null,
        amount: null,
        lead_source: null,
        probability: null,
        closed_on: null,
        description: '',
        is_active: false,
        account: null,
        closed_by: null,
        org: null,
        contacts: [],
        assigned_to: [],
        tags: [],
        teams: [],
      })}>
        Add New Opportunity
      </Button>
    </Box>
  );
};

export default OpportunityComponent;
