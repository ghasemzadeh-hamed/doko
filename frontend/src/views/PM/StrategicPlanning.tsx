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

const API_ENDPOINT = 'http://localhost:8000/StrategicPlanning/';

const StrategicPlanningComponent = () => {
  // ** State
  const [strategicPlannings, setStrategicPlannings] = useState([]);
  const [editingStrategicPlanning, setEditingStrategicPlanning] = useState(null);

  useEffect(() => {
    // Fetch strategic plannings from the Django API on component mount
    fetchStrategicPlannings();
  }, []);

  const fetchStrategicPlannings = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setStrategicPlannings(response.data);
    } catch (error) {
      console.error('Error fetching strategic plannings:', error);
    }
  };

  const handleEdit = (strategicPlanning) => {
    setEditingStrategicPlanning(strategicPlanning);
  };

  const handleDelete = async (strategicPlanningId) => {
    try {
      await axios.delete(`${API_ENDPOINT}${strategicPlanningId}/`);
      console.log('Strategic planning deleted successfully');
      fetchStrategicPlannings(); // Fetch strategic plannings again after deletion
    } catch (error) {
      console.error('Error deleting strategic planning:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingStrategicPlanning) {
        // Update existing strategic planning
        await axios.put(`${API_ENDPOINT}${editingStrategicPlanning.id}/`, editingStrategicPlanning);
        console.log('Strategic planning updated successfully');
      } else {
        // Create new strategic planning
        const newStrategicPlanning = {
          // Add other fields as needed
        };
        await axios.post(API_ENDPOINT, newStrategicPlanning);
        console.log('New strategic planning added successfully');
      }

      fetchStrategicPlannings(); // Fetch strategic plannings again after saving
      setEditingStrategicPlanning(null); // Clear editing state
    } catch (error) {
      console.error('Error saving strategic planning:', error);
    }
  };

  const handleCancel = () => {
    setEditingStrategicPlanning(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Strategic Plannings
      </Typography>

      {/* List of Strategic Plannings */}
      {strategicPlannings.map((strategicPlanning) => (
        <Box key={strategicPlanning.id}>
          <Typography variant="body1">{strategicPlanning.strategies}</Typography>
          <Typography variant="body1">{strategicPlanning.action_plan}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(strategicPlanning)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(strategicPlanning.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Strategic Planning Form */}
      {editingStrategicPlanning && (
        <Box>
          {/* Edit Strategic Planning Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Strategies"
            value={editingStrategicPlanning.strategies}
            onChange={(e) => setEditingStrategicPlanning({ ...editingStrategicPlanning, strategies: e.target.value })}
          />
          <input
            type="text"
            placeholder="Action Plan"
            value={editingStrategicPlanning.action_plan}
            onChange={(e) => setEditingStrategicPlanning({ ...editingStrategicPlanning, action_plan: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Strategic Planning Button */}
      <Button onClick={() => setEditingStrategicPlanning({ strategies: '', action_plan: '' })}>
        Add New Strategic Planning
      </Button>
    </Box>
  );
};

export default StrategicPlanningComponent;
