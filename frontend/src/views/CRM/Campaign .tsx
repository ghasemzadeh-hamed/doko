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

const CampaignComponent = () => {
  // ** State
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // Fetch campaigns from the Django API on component mount
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await apiClient.get('/Campaign/');
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
  };

  const handleDelete = async (campaignId) => {
    try {
      const response = await apiClient.delete(`/Campaign/${campaignId}/`);
      console.log('Campaign deleted successfully:', response.data);
      fetchCampaigns(); // Fetch campaigns again after deletion
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingCampaign) {
        // Update existing campaign
        const response = await apiClient.put(`/Campaign/${editingCampaign.id}/`, editingCampaign);
        console.log('Campaign updated successfully:', response.data);
      } else {
        // Create new campaign
        const newCampaign = { name: '', start_date: null, end_date: null, description: '' };
        const response = await apiClient.post('/Campaign/', newCampaign);
        console.log('New campaign added successfully:', response.data);
      }

      fetchCampaigns(); // Fetch campaigns again after saving
      setEditingCampaign(null); // Clear editing state
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  const handleCancel = () => {
    setEditingCampaign(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Campaigns
      </Typography>

      {/* Display an alert if needed */}
      {openAlert && (
        <Alert severity="warning" sx={{ '& a': { fontWeight: 400 } }}>
          <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
          {/* Resend Confirmation Link */}
        </Alert>
      )}

      {/* List of Campaigns */}
      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item key={campaign.id}>
            <Box>
              <Typography variant="h6">{campaign.name}</Typography>
              <Typography variant="body1">Start Date: {campaign.start_date}</Typography>
              <Typography variant="body1">End Date: {campaign.end_date}</Typography>
              <Typography variant="body2">Description: {campaign.description}</Typography>
              <Button onClick={() => handleEdit(campaign)}>Edit</Button>
              <Button onClick={() => handleEdit(newCampaign)}>sove</Button>
              <IconButton onClick={() => handleDelete(campaign.id)}>
                <DeleteOutline />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Edit Campaign Form */}
      {editingCampaign && (
        <Box>
          {/* Edit Campaign Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Campaign Name"
            value={editingCampaign.name}
            onChange={(e) => setEditingCampaign({ editingCampaign, name: e.target.value })}
          />
          <input
            type="date"
            placeholder="Start Date"
            value={editingCampaign.start_date}
            onChange={(e) => setEditingCampaign({ editingCampaign, start_date: e.target.value })}
          />
          <input
            type="date"
            placeholder="End Date"
            value={editingCampaign.end_date}
            onChange={(e) => setEditingCampaign({ editingCampaign, end_date: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={editingCampaign.description}
            onChange={(e) => setEditingCampaign({ editingCampaign, description: e.target.value })}
          />

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Campaign Button */}
      <Button onClick={() => setEditingCampaign({ name: '', start_date: null, end_date: null, description: '' })}>
        Add New Campaign
      </Button>
    </Box>
  );
};

export default CampaignComponent;
