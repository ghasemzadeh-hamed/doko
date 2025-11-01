// the Product_Unit and Unit models
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

const UnitComponent = () => {
  // ** State
  const [units, setUnits] = useState([]);
  const [editingUnit, setEditingUnit] = useState(null);

  useEffect(() => {
    // Fetch units from the Django API on component mount
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await apiClient.get('/Unit/');
      setUnits(response.data);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  const handleEdit = (unit) => {
    setEditingUnit(unit);
  };

  const handleDelete = async (unitId) => {
    try {
      const response = await apiClient.delete(`/Unit/${unitId}/`);
      console.log('Unit deleted successfully:', response.data);
      fetchUnits(); // Fetch units again after deletion
    } catch (error) {
      console.error('Error deleting unit:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingUnit) {
        // Update existing unit
        const response = await apiClient.put(`/Unit/${editingUnit.id}/`, editingUnit);
        console.log('Unit updated successfully:', response.data);
      } else {
        // Create new unit
        const newUnit = {
          // Add other fields as needed
        };
        const response = await apiClient.post('/Unit/', newUnit);
        console.log('New unit added successfully:', response.data);
      }

      fetchUnits(); // Fetch units again after saving
      setEditingUnit(null); // Clear editing state
    } catch (error) {
      console.error('Error saving unit:', error);
    }
  };

  const handleCancel = () => {
    setEditingUnit(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Units
      </Typography>

      {/* List of Units */}
      {units.map((unit) => (
        <Box key={unit.id}>
          {/* Display other fields as needed */}
          <Typography variant="body1">{unit.id}</Typography>
          <Button onClick={() => handleEdit(unit)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(unit.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Unit Form */}
      {editingUnit && (
        <Box>
          {/* Edit Unit Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Unit ID"
            value={editingUnit.id}
            onChange={(e) => setEditingUnit({ ...editingUnit, id: e.target.value })}
          />
          {/* Add other unit fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Unit Button */}
      <Button onClick={() => setEditingUnit({ id: '' })}>
        Add New Unit
      </Button>
    </Box>
  );
};

export default UnitComponent;
