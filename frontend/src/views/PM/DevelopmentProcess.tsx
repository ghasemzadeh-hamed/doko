import { useState, useEffect } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8000/DevelopmentProcess/';

const DevelopmentProcessComponent = () => {
  const [developmentProcesses, setDevelopmentProcesses] = useState([]);
  const [editingProcess, setEditingProcess] = useState(null);

  useEffect(() => {
    fetchDevelopmentProcesses();
  }, []);

  const fetchDevelopmentProcesses = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setDevelopmentProcesses(response.data);
    } catch (error) {
      console.error('Error fetching development processes:', error);
    }
  };

  const handleEdit = (process) => {
    setEditingProcess(process);
  };

  const handleDelete = async (processId) => {
    try {
      await axios.delete(`${API_ENDPOINT}${processId}/`);
      fetchDevelopmentProcesses();
    } catch (error) {
      console.error('Error deleting development process:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingProcess) {
        await axios.put(`${API_ENDPOINT}${editingProcess.id}/`, editingProcess);
      } else {
        const newProcess = {
          // Add fields for the new process
        };
        await axios.post(API_ENDPOINT, newProcess);
      }

      fetchDevelopmentProcesses();
      setEditingProcess(null);
    } catch (error) {
      console.error('Error saving development process:', error);
    }
  };

  const handleCancel = () => {
    setEditingProcess(null);
  };

  return (
    <div>
      <h2>Development Processes</h2>

      {developmentProcesses.map((process) => (
        <div key={process.id}>
          {/* Display process fields as needed */}
          <p>{process.project}</p>
          <p>{process.development_steps}</p>
          {/* Add more fields here */}
          <button onClick={() => handleEdit(process)}>Edit</button>
          <button onClick={() => handleDelete(process.id)}>Delete</button>
        </div>
      ))}

      {editingProcess && (
        <div>
          {/* Edit Process Fields */}
          <input
            type="text"
            placeholder="Development Steps"
            value={editingProcess.development_steps}
            onChange={(e) => setEditingProcess({ ...editingProcess, development_steps: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}

      <button onClick={() => setEditingProcess({ development_steps: '' })}>Add New Development Process</button>
    </div>
  );
};

export default DevelopmentProcessComponent;
