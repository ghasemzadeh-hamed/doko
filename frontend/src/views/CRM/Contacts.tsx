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
import axios from 'axios';

const ContactsComponent = () => {
  // ** State
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // Fetch contacts from the Django API on component mount
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Contacts/');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  const handleDelete = async (contactId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/Contacts/${contactId}/`);
      console.log('Contact deleted successfully:', response.data);
      fetchContacts(); // Fetch contacts again after deletion
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingContact) {
        // Update existing contact
        const response = await axios.put(`http://localhost:8000/Contacts/${editingContact.id}/`, editingContact);
        console.log('Contact updated successfully:', response.data);
      } else {
        // Create new contact
        const newContact = {
          salutation: '',
          first_name: '',
          last_name: '',
          date_of_birth: null,
          email: '',
          social_media_type: null,
          social_media: '',
          linked_in_url: '',
          facebook_url: '',
          twitter_username: '',
          user: null,
          org: null,
          financial_keys: [],
          teams: [],
        };
        const response = await axios.post('http://localhost:8000/Contacts/', newContact);
        console.log('New contact added successfully:', response.data);
      }

      fetchContacts(); // Fetch contacts again after saving
      setEditingContact(null); // Clear editing state
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleCancel = () => {
    setEditingContact(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Contacts
      </Typography>

      {/* Display an alert if needed */}
      {openAlert && (
        <Alert severity="warning" sx={{ '& a': { fontWeight: 400 } }}>
          <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
          {/* Resend Confirmation Link */}
        </Alert>
      )}

      {/* List of Contacts */}
      <Grid container spacing={3}>
        {contacts.map((contact) => (
          <Grid item key={contact.id}>
            <Box>
              <Typography variant="h6">{contact.first_name} {contact.last_name}</Typography>
              <Typography variant="body1">Email: {contact.email}</Typography>
              <Button onClick={() => handleEdit(contact)}>Edit</Button>
              <IconButton onClick={() => handleDelete(contact.id)}>
                <DeleteOutline />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Edit Contact Form */}
      {editingContact && (
        <Box>
          {/* Edit Contact Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="First Name"
            value={editingContact.first_name}
            onChange={(e) => setEditingContact({ ...editingContact, first_name: e.target.value })}
          />
          {/* Add other contact fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Contact Button */}
      <Button onClick={() => setEditingContact({
        salutation: '',
        first_name: '',
        last_name: '',
        date_of_birth: null,
        email: '',
        social_media_type: null,
        social_media: '',
        linked_in_url: '',
        facebook_url: '',
        twitter_username: '',
        user: null,
        org: null,
        financial_keys: [],
        teams: [],
      })}>
        Add New Contact
      </Button>
    </Box>
  );
};

export default ContactsComponent;
