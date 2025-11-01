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

const CRMTaskComponent = () => {
  // ** State
  const [crmTasks, setCRMTasks] = useState([]);
  const [editingCRMTask, setEditingCRMTask] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // Fetch CRM tasks from the Django API on component mount
    fetchCRMTasks();
  }, []);

  const fetchCRMTasks = async () => {
    try {
      const response = await apiClient.get('/CRMTask/');
      setCRMTasks(response.data);
    } catch (error) {
      console.error('Error fetching CRM tasks:', error);
    }
  };

  const handleEdit = (crmTask) => {
    setEditingCRMTask(crmTask);
  };

  const handleDelete = async (crmTaskId) => {
    try {
      const response = await apiClient.delete(`/CRMTask/${crmTaskId}/`);
      console.log('CRM task deleted successfully:', response.data);
      fetchCRMTasks(); // Fetch CRM tasks again after deletion
    } catch (error) {
      console.error('Error deleting CRM task:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingCRMTask) {
        // Update existing CRM task
        const response = await apiClient.put(`/CRMTask/${editingCRMTask.id}/`, editingCRMTask);
        console.log('CRM task updated successfully:', response.data);
      } else {
        // Create new CRM task
        const newCRMTask = {
          title: '',
          status: null,
          priority: null,
          due_date: null,
          account: null,
          org: null,
          contacts: [],
          assigned_to: [],
          teams: [],
        };
        const response = await apiClient.post('/CRMTask/', newCRMTask);
        console.log('New CRM task added successfully:', response.data);
      }

      fetchCRMTasks(); // Fetch CRM tasks again after saving
      setEditingCRMTask(null); // Clear editing state
    } catch (error) {
      console.error('Error saving CRM task:', error);
    }
  };

  const handleCancel = () => {
    setEditingCRMTask(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        CRM Tasks
      </Typography>

      {/* Display an alert if needed */}
      {openAlert && (
        <Alert severity="warning" sx={{ '& a': { fontWeight: 400 } }}>
          <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
          {/* Resend Confirmation Link */}
        </Alert>
      )}

      {/* List of CRM Tasks */}
      <Grid container spacing={3}>
        {crmTasks.map((crmTask) => (
          <Grid item key={crmTask.id}>
            <Box>
              <Typography variant="h6">{crmTask.title}</Typography>
              <Typography variant="body1">Status: {crmTask.status}</Typography>
              <Button onClick={() => handleEdit(crmTask)}>Edit</Button>
              <IconButton onClick={() => handleDelete(crmTask.id)}>
                <DeleteOutline />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Edit CRM Task Form */}
      {editingCRMTask && (
        <Box>
          {/* Edit CRM Task Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Title"
            value={editingCRMTask.title}
            onChange={(e) => setEditingCRMTask({ ...editingCRMTask, title: e.target.value })}
          />
          {/* Add other CRM task fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New CRM Task Button */}
      <Button onClick={() => setEditingCRMTask({
        title: '',
        status: null,
        priority: null,
        due_date: null,
        account: null,
        org: null,
        contacts: [],
        assigned_to: [],
        teams: [],
      })}>
        Add New CRM Task
      </Button>
    </Box>
  );
};

export default CRMTaskComponent;
