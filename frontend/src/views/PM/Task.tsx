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


// ** Constants
const API_ENDPOINT = '/Task/';

const TaskComponent = () => {
  // ** State
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Fetch tasks from the Django API on component mount
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINT);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINT}${taskId}/`);
      console.log('Task deleted successfully:', response.data);
      fetchTasks(); // Fetch tasks again after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingTask) {
        // Update existing task
        const response = await apiClient.put(`${API_ENDPOINT}${editingTask.id}/`, editingTask);
        console.log('Task updated successfully:', response.data);
      } else {
        // Create new task
        const newTask = {
          // Add other fields as needed
        };
        const response = await apiClient.post(API_ENDPOINT, newTask);
        console.log('New task added successfully:', response.data);
      }

      fetchTasks(); // Fetch tasks again after saving
      setEditingTask(null); // Clear editing state
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleCancel = () => {
    setEditingTask(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Task Management
      </Typography>

      {/* List of Tasks */}
      {tasks.map((task) => (
        <Box key={task.id}>
          <Typography variant="body1">{task.name}</Typography>
          <Typography variant="body1">{task.description}</Typography>
          <Typography variant="body1">{task.start_date}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(task)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(task.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Task Form */}
      {editingTask && (
        <Box>
          {/* Edit Task Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Name"
            value={editingTask.name}
            onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Task Button */}
      <Button onClick={() => setEditingTask({ name: '', description: '' })}>Add New Task</Button>
    </Box>
  );
};

export default TaskComponent;
