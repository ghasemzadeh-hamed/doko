// components/AddStore.tsx
import React, { useState } from 'react';
import apiClient from 'src/services/apiClient';

const AddStore: React.FC = () => {
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
      const response = await apiClient.post('/Store/', formData);
      console.log('Store added successfully:', response.data);

      // You can perform additional actions after adding the Store
    } catch (error) {
      console.error('Error adding Store:', error);
    }
  };

  return (
    <div>
      <h1>Add Store</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>Store Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Online:</label>
        <input type="checkbox" name="online" checked={formData.online} onChange={handleCheckboxChange} />

        {/* Add other form fields as needed */}

        <button type="submit">Add Store</button>
      </form>
    </div>
  );
};

export default AddStore;
