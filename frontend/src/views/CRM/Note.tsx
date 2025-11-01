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

const NoteComponent = () => {
  // ** State
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // Fetch notes from the Django API on component mount
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await apiClient.get('/Note/');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleDelete = async (noteId) => {
    try {
      const response = await apiClient.delete(`/Note/${noteId}/`);
      console.log('Note deleted successfully:', response.data);
      fetchNotes(); // Fetch notes again after deletion
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingNote) {
        // Update existing note
        const response = await apiClient.put(`/Note/${editingNote.id}/`, editingNote);
        console.log('Note updated successfully:', response.data);
      } else {
        // Create new note
        const newNote = {
          content: '',
          user: null,
        };
        const response = await apiClient.post('/Note/', newNote);
        console.log('New note added successfully:', response.data);
      }

      fetchNotes(); // Fetch notes again after saving
      setEditingNote(null); // Clear editing state
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleCancel = () => {
    setEditingNote(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Notes
      </Typography>

      {/* Display an alert if needed */}
      {openAlert && (
        <Alert severity="warning" sx={{ '& a': { fontWeight: 400 } }}>
          <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
          {/* Resend Confirmation Link */}
        </Alert>
      )}

      {/* List of Notes */}
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id}>
            <Box>
              <Typography variant="body1">{note.content}</Typography>
              <Button onClick={() => handleEdit(note)}>Edit</Button>
              <IconButton onClick={() => handleDelete(note.id)}>
                <DeleteOutline />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Edit Note Form */}
      {editingNote && (
        <Box>
          {/* Edit Note Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Content"
            value={editingNote.content}
            onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
          />
          {/* Add other note fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Note Button */}
      <Button onClick={() => setEditingNote({
        content: '',
        user: null,
      })}>
        Add New Note
      </Button>
    </Box>
  );
};

export default NoteComponent;
