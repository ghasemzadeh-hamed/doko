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
import axios from 'axios';

const PlatformSettingsComponent = () => {
  // ** State
  const [platformSettings, setPlatformSettings] = useState([]);
  const [editingPlatformSetting, setEditingPlatformSetting] = useState(null);

  useEffect(() => {
    // Fetch platform settings from the Django API on component mount
    fetchPlatformSettings();
  }, []);

  const fetchPlatformSettings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/PlatformSettings/');
      setPlatformSettings(response.data);
    } catch (error) {
      console.error('Error fetching platform settings:', error);
    }
  };

  const handleEdit = (platformSetting) => {
    setEditingPlatformSetting(platformSetting);
  };

  const handleUpdate = async () => {
    try {
      if (editingPlatformSetting) {
        // Update existing platform setting
        const response = await axios.put(`http://localhost:8000/PlatformSettings/${editingPlatformSetting.id}/`, editingPlatformSetting);
        console.log('Platform setting updated successfully:', response.data);
        fetchPlatformSettings(); // Fetch platform settings again after updating
        setEditingPlatformSetting(null); // Clear editing state
      }
    } catch (error) {
      console.error('Error updating platform setting:', error);
    }
  };

  const handleDelete = async (platformSettingId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/PlatformSettings/${platformSettingId}/`);
      console.log('Platform setting deleted successfully:', response.data);
      fetchPlatformSettings(); // Fetch platform settings again after deletion
    } catch (error) {
      console.error('Error deleting platform setting:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Platform Settings
      </Typography>

      {/* List of Platform Settings */}
      {platformSettings.map((platformSetting) => (
        <Box key={platformSetting.id}>
          <Typography variant="body1">{platformSetting.template_name}</Typography>
          <Button onClick={() => handleEdit(platformSetting)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(platformSetting.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Platform Setting Form */}
      {editingPlatformSetting && (
        <Box>
          {/* Edit Platform Setting Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Template Name"
            value={editingPlatformSetting.template_name}
            onChange={(e) => setEditingPlatformSetting({ ...editingPlatformSetting, template_name: e.target.value })}
          />
          {/* Add other platform setting fields as needed */}
          {/* Similar input fields for title_prefix, description_prefix, backend_address, backend_port, frontend_address, frontend_port, footer_content, platform_logo, navigation_links */}

          {/* Update and Cancel Buttons */}
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={() => setEditingPlatformSetting(null)}>Cancel</Button>
        </Box>
      )}

      {/* Add New Platform Setting Button */}
      <Button onClick={() => setEditingPlatformSetting({ template_name: '' })}>
        Add New Platform Setting
      </Button>
    </Box>
  );
};

export default PlatformSettingsComponent;
