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

const TeamsComponent = () => {
  // ** State
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    // Fetch teams from the Django API on component mount
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await apiClient.get('/Teams/');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
  };

  const handleDelete = async (teamId) => {
    try {
      const response = await apiClient.delete(`/Teams/${teamId}/`);
      console.log('Team deleted successfully:', response.data);
      fetchTeams(); // Fetch teams again after deletion
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingTeam) {
        // Update existing team
        const response = await apiClient.put(`/Teams/${editingTeam.id}/`, editingTeam);
        console.log('Team updated successfully:', response.data);
      } else {
        // Create new team
        const newTeam = {
          name: '',
          description: '',
          teams: [],
        };
        const response = await apiClient.post('/Teams/', newTeam);
        console.log('New team added successfully:', response.data);
      }

      fetchTeams(); // Fetch teams again after saving
      setEditingTeam(null); // Clear editing state
    } catch (error) {
      console.error('Error saving team:', error);
    }
  };

  const handleCancel = () => {
    setEditingTeam(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Teams
      </Typography>

      {/* List of Teams */}
      {teams.map((team) => (
        <Box key={team.id}>
          <Typography variant="body1">{team.name}</Typography>
          <Button onClick={() => handleEdit(team)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(team.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Team Form */}
      {editingTeam && (
        <Box>
          {/* Edit Team Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Team Name"
            value={editingTeam.name}
            onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
          />
          <textarea
            placeholder="Team Description"
            value={editingTeam.description}
            onChange={(e) => setEditingTeam({ ...editingTeam, description: e.target.value })}
          />
          {/* Add other team fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Team Button */}
      <Button onClick={() => setEditingTeam({ name: '', description: '', teams: [] })}>
        Add New Team
      </Button>
    </Box>
  );
};

export default TeamsComponent;
