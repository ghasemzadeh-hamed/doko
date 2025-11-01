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

const TagsComponent = () => {
  // ** State
  const [tags, setTags] = useState([]);
  const [editingTag, setEditingTag] = useState(null);

  useEffect(() => {
    // Fetch tags from the Django API on component mount
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get('http://localhost:8000/tags/');
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
  };

  const handleDelete = async (tagId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/tags/${tagId}/`);
      console.log('Tag deleted successfully:', response.data);
      fetchTags(); // Fetch tags again after deletion
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingTag) {
        // Update existing tag
        const response = await axios.put(`http://localhost:8000/tags/${editingTag.id}/`, editingTag);
        console.log('Tag updated successfully:', response.data);
      } else {
        // Create new tag
        const newTag = {
          name: '',
          // Add other fields as needed
        };
        const response = await axios.post('http://localhost:8000/tags/', newTag);
        console.log('New tag added successfully:', response.data);
      }

      fetchTags(); // Fetch tags again after saving
      setEditingTag(null); // Clear editing state
    } catch (error) {
      console.error('Error saving tag:', error);
    }
  };

  const handleCancel = () => {
    setEditingTag(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tags
      </Typography>

      {/* List of Tags */}
      {tags.map((tag) => (
        <Box key={tag.id}>
          <Typography variant="body1">{tag.name}</Typography>
          <Button onClick={() => handleEdit(tag)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(tag.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Tag Form */}
      {editingTag && (
        <Box>
          {/* Edit Tag Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Tag Name"
            value={editingTag.name}
            onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
          />
          {/* Add other tag fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Tag Button */}
      <Button onClick={() => setEditingTag({ name: '' })}>
        Add New Tag
      </Button>
    </Box>
  );
};

export default TagsComponent;
