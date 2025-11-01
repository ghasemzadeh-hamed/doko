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

const AttachmentsComponent = () => {
  // ** State
  const [attachments, setAttachments] = useState([]);
  const [editingAttachment, setEditingAttachment] = useState(null);

  useEffect(() => {
    // Fetch attachments from the Django API on component mount
    fetchAttachments();
  }, []);

  const fetchAttachments = async () => {
    try {
      const response = await apiClient.get('/Attachment/');
      setAttachments(response.data);
    } catch (error) {
      console.error('Error fetching attachments:', error);
    }
  };

  const handleEdit = (attachment) => {
    setEditingAttachment(attachment);
  };

  const handleDelete = async (attachmentId) => {
    try {
      const response = await apiClient.delete(`/Attachments/${attachmentId}/`);
      console.log('Attachment deleted successfully:', response.data);
      fetchAttachments(); // Fetch attachments again after deletion
    } catch (error) {
      console.error('Error deleting attachment:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingAttachment) {
        // Update existing attachment
        const response = await apiClient.put(`/Attachments/${editingAttachment.id}/`, editingAttachment);
        console.log('Attachment updated successfully:', response.data);
      } else {
        // Create new attachment
        const newAttachment = {
          file_name: '',

          // Add other fields as needed
        };
        const response = await apiClient.post('/Attachments/', newAttachment);
        console.log('New attachment added successfully:', response.data);
      }

      fetchAttachments(); // Fetch attachments again after saving
      setEditingAttachment(null); // Clear editing state
    } catch (error) {
      console.error('Error saving attachment:', error);
    }
  };

  const handleCancel = () => {
    setEditingAttachment(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Attachments
      </Typography>

      {/* List of Attachments */}
      {attachments.map((attachment) => (
        <Box key={attachment.id}>
          <Typography variant="body1">{attachment.file_name}</Typography>
          <Button onClick={() => handleEdit(attachment)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(attachment.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Attachment Form */}
      {editingAttachment && (
        <Box>
          {/* Edit Attachment Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="File Name"
            value={editingAttachment.file_name}
            onChange={(e) => setEditingAttachment({ ...editingAttachment, file_name: e.target.value })}
          />
          {/* Add other attachment fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Attachment Button */}
      <Button onClick={() => setEditingAttachment({ file_name: '' })}>
        Add New Attachment
      </Button>
    </Box>
  );
};

export default AttachmentsComponent;
