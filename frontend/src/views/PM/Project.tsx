// Import necessary libraries
import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the Project interface
interface Project {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: string;
  tag: string[]; // Assuming Tag has a 'name' property
}


// Define the Next.js component
const ProjectComponent: React.FC = () => {


  // State for storing projects
  const [projects, setProjects] = useState<Project[]>([]);


  // State to hold the data for adding/editing a project
  const [formData, setFormData] = useState<Project>({
    id: 0,
    name: '',
    start_date: '',
    end_date: '',
    budget: 0,
    status: '',
    tag: [],
  });

   // Function to fetch the list of projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Project/');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Function to handle form submission for adding/editing a project
  const handleSubmit = async () => {
    try {
      // Check if it's an edit or add operation based on the presence of an ID
      if (formData.id) {
        await axios.put(`http://localhost:8000/Project/${formData.id}/`, formData);
      } else {
        await axios.post('http://localhost:8000/Project/', formData);
      }


      // Fetch the updated list of projects
      fetchProjects();
    } catch (error) {
      console.error('Error submitting project data:', error);
    }
  };

  // Function to handle editing a project
  const handleEdit = (id: number) => {
    // Find the project with the given ID
    const selectedProject = projects.find((project) => project.id === id);

    // Set the form data for editing
    if (selectedProject) {
      setFormData(selectedProject);
    }
  };

  // Function to handle deleting a project
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/Project/${id}/`);

      // Fetch the updated list of projects
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // useEffect to fetch the initial list of projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);


  return (
    <div>
      {/* Display the list of projects */}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name} - {project.status}
            <button onClick={() => handleEdit(project.id)}>Edit</button>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Form to add a new project */}
      <form>
        <label>Name:</label>
        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="date" value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
        <input type="number" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} />
        <input type="text" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} />

        <button type="button" onClick={handleSubmit}>
          {formData.id ? 'Edit Project' : 'Add Project'}
        </button>
      </form>
    </div>
  );
};

export default ProjectComponent;
