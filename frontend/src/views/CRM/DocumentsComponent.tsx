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
import apiClient from 'src/services/apiClient';

const DocumentsComponent = () => {
  // ** State
  const [documents, setDocuments] = useState([]);
  const [editingDocument, setEditingDocument] = useState(null);

  useEffect(() => {
    // Fetch documents from the Django API on component mount
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await apiClient.get('/Documents/');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleEdit = (document) => {
    setEditingDocument(document);
  };

  const handleDelete = async (documentId) => {
    try {
      const response = await apiClient.delete(`/Document/${documentId}/`);
      console.log('Document deleted successfully:', response.data);
      fetchDocuments(); // Fetch documents again after deletion
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Documents
      </Typography>

      {/* List of Documents */}
      {documents.map((document) => (
        <Box key={document.id}>
          <Typography variant="body1">{document.name}</Typography>
          <Typography variant="body2">{document.title}</Typography>
          {/* Add other document fields as needed */}
          <Button onClick={() => handleEdit(document)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(document.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Document Form */}
      {editingDocument && (
        <Box>
          {/* Edit Document Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Document Name"
            value={editingDocument.name}
            onChange={(e) => setEditingDocument({ ...editingDocument, name: e.target.value })}
          />
          {/* Add other document fields as needed */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => setEditingDocument(null)}>Cancel</Button>
        </Box>
      )}

      {/* Add New Document Button */}
      <Button onClick={() => setEditingDocument({ name: '' })}>
        Add New Document
      </Button>
    </Box>
  );
};

export default DocumentsComponent;
