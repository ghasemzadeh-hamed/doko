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

const NavigationLinksComponent = () => {
  // ** State
  const [navigationLinks, setNavigationLinks] = useState([]);
  const [editingNavigationLink, setEditingNavigationLink] = useState(null);
  const [sublinks, setSublinks] = useState([]);
  const [editingSublink, setEditingSublink] = useState(null);

  useEffect(() => {
    // Fetch navigation links and sublinks from the Django API on component mount
    fetchNavigationLinks();
    fetchSublinks();
  }, []);

  const fetchNavigationLinks = async () => {
    try {
      const response = await apiClient.get('/NavigationLink/');
      setNavigationLinks(response.data);
    } catch (error) {
      console.error('Error fetching navigation links:', error);
    }
  };

  const fetchSublinks = async () => {
    try {
      const response = await apiClient.get('/Sublink/');
      setSublinks(response.data);
    } catch (error) {
      console.error('Error fetching sublinks:', error);
    }
  };

  const handleNavigationLinkEdit = (navigationLink) => {
    setEditingNavigationLink(navigationLink);
  };

  const handleNavigationLinkDelete = async (navigationLinkId) => {
    try {
      const response = await apiClient.delete(`/NavigationLink/${navigationLinkId}/`);
      console.log('NavigationLink deleted successfully:', response.data);
      fetchNavigationLinks(); // Fetch navigation links again after deletion
    } catch (error) {
      console.error('Error deleting navigation link:', error);
    }
  };

  const handleSublinkEdit = (sublink) => {
    setEditingSublink(sublink);
  };

  const handleSublinkDelete = async (sublinkId) => {
    try {
      const response = await apiClient.delete(`/Sublink/${sublinkId}/`);
      console.log('Sublink deleted successfully:', response.data);
      fetchSublinks(); // Fetch sublinks again after deletion
    } catch (error) {
      console.error('Error deleting sublink:', error);
    }
  };

  const handleNavigationLinkSave = async () => {
    try {
      if (editingNavigationLink) {
        // Update existing navigation link
        const response = await apiClient.put(`/NavigationLink/${editingNavigationLink.id}/`, editingNavigationLink);
        console.log('NavigationLink updated successfully:', response.data);
      } else {
        // Create new navigation link
        const newNavigationLink = {
          title: '',
          url: '',
        };
        const response = await apiClient.post('/NavigationLink/', newNavigationLink);
        console.log('New navigation link added successfully:', response.data);
      }

      fetchNavigationLinks(); // Fetch navigation links again after saving
      setEditingNavigationLink(null); // Clear editing state
    } catch (error) {
      console.error('Error saving navigation link:', error);
    }
  };

  const handleSublinkSave = async () => {
    try {
      if (editingSublink) {
        // Update existing sublink
        const response = await apiClient.put(`/Sublink/${editingSublink.id}/`, editingSublink);
        console.log('Sublink updated successfully:', response.data);
      } else {
        // Create new sublink
        const newSublink = {
          title: '',
          url: '',
          navigationlink: null,
        };
        const response = await apiClient.post('/Sublink/', newSublink);
        console.log('New sublink added successfully:', response.data);
      }

      fetchSublinks(); // Fetch sublinks again after saving
      setEditingSublink(null); // Clear editing state
    } catch (error) {
      console.error('Error saving sublink:', error);
    }
  };

  const handleCancel = () => {
    setEditingNavigationLink(null); // Clear navigation link editing state
    setEditingSublink(null); // Clear sublink editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Navigation Links
      </Typography>

      {/* List of Navigation Links */}
      {navigationLinks.map((navigationLink) => (
        <Box key={navigationLink.id}>
          <Typography variant="body1">{navigationLink.title}</Typography>
          <Button onClick={() => handleNavigationLinkEdit(navigationLink)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleNavigationLinkDelete(navigationLink.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Navigation Link Form */}
      {editingNavigationLink && (
        <Box>
          {/* Edit Navigation Link Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Title"
            value={editingNavigationLink.title}
            onChange={(e) => setEditingNavigationLink({ ...editingNavigationLink, title: e.target.value })}
          />
          <input
            type="url"
            placeholder="URL"
            value={editingNavigationLink.url}
            onChange={(e) => setEditingNavigationLink({ ...editingNavigationLink, url: e.target.value })}
          />
          {/* Add other navigation link fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleNavigationLinkSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* List of Sublinks */}
      {sublinks.map((sublink) => (
        <Box key={sublink.id}>
          <Typography variant="body1">{sublink.title}</Typography>
          <Button onClick={() => handleSublinkEdit(sublink)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleSublinkDelete(sublink.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Sublink Form */}
      {editingSublink && (
        <Box>
          {/* Edit Sublink Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Title"
            value={editingSublink.title}
            onChange={(e) => setEditingSublink({ ...editingSublink, title: e.target.value })}
          />
          <input
            type="url"
            placeholder="URL"
            value={editingSublink.url}
            onChange={(e) => setEditingSublink({ ...editingSublink, url: e.target.value })}
          />
          {/* Add other sublink fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSublinkSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}
    </Box>
  );
};

export default NavigationLinksComponent;
