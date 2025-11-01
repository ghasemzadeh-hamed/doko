// components/AddServiceProvider.tsx
import React, { useState } from 'react';
import apiClient from 'src/services/apiClient';

const AddServiceProvider: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    online: false,
    location: null,
    managers: [],
    cashiers: [],
    apprentice: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await apiClient.post('/ServiceProvider/', formData);
      console.log('Service Provider added successfully:', response.data);

      // You can perform additional actions after adding the service provider
    } catch (error) {
      console.error('Error adding service provider:', error);
    }
  };

  return (
    <div>
      <h1>Add Service Provider</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>Service Provider Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Online:</label>
        <input type="checkbox" name="online" checked={formData.online} onChange={handleCheckboxChange} />

        {/* Add other form fields as needed */}

        <button type="submit">Add Service Provider</button>
      </form>
    </div>
  );
};
export default AddServiceProvider;
