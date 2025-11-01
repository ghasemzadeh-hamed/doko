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
import axios from 'axios';

// ** Constants
const API_ENDPOINT = 'http://localhost:8000/ProjectManagement/';

const ProjectManagementComponent = () => {
  // ** State
  const [projectManagements, setProjectManagements] = useState([]);
  const [editingProjectManagement, setEditingProjectManagement] = useState(null);

  useEffect(() => {
    // Fetch project managements from the Django API on component mount
    fetchProjectManagements();
  }, []);

  const fetchProjectManagements = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setProjectManagements(response.data);
    } catch (error) {
      console.error('Error fetching project managements:', error);
    }
  };

  const handleEdit = (projectManagement) => {
    setEditingProjectManagement(projectManagement);
  };

  const handleDelete = async (projectManagementId) => {
    try {
      await axios.delete(`${API_ENDPOINT}${projectManagementId}/`);
      console.log('Project management deleted successfully');
      fetchProjectManagements(); // Fetch project managements again after deletion
    } catch (error) {
      console.error('Error deleting project management:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingProjectManagement) {
        // Update existing project management
        await axios.put(`${API_ENDPOINT}${editingProjectManagement.id}/`, editingProjectManagement);
        console.log('Project management updated successfully');
      } else {
        // Create new project management
        const newProjectManagement = {
          // Add other fields as needed
        };
        await axios.post(API_ENDPOINT, newProjectManagement);
        console.log('New project management added successfully');
      }

      fetchProjectManagements(); // Fetch project managements again after saving
      setEditingProjectManagement(null); // Clear editing state
    } catch (error) {
      console.error('Error saving project management:', error);
    }
  };

  const handleCancel = () => {
    setEditingProjectManagement(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Project Managements
      </Typography>

      {/* List of Project Managements */}
      {projectManagements.map((projectManagement) => (
        <Box key={projectManagement.id}>
          {/* Display project management fields */}
          {/* For simplicity, you can use standard HTML or customize with MUI components */}
          <Typography variant="body1">{projectManagement.project}</Typography>
          <Typography variant="body1">{projectManagement.project_manager}</Typography>
          <Typography variant="body1">{projectManagement.progress_report}</Typography>
          {/* Add more fields here */}

          {/* Edit and Delete Buttons */}
          <Button onClick={() => handleEdit(projectManagement)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(projectManagement.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Project Management Form */}
      {editingProjectManagement && (
        <Box>
          {/* Edit Project Management Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Project"
            value={editingProjectManagement.project}
            onChange={(e) => setEditingProjectManagement({ ...editingProjectManagement, project: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Project Management Button */}
      <Button onClick={() => setEditingProjectManagement({ project: '' })}>Add New Project Management</Button>
    </Box>
  );
};

export default ProjectManagementComponent;
