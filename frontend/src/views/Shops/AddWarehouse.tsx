
// components/AddWarehouse.tsx
import React, { useState } from 'react';
import axios from 'axios';

const AddWarehouse: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    online: false,
    capacity: null,
    max_capacity: null,
    max_storage_temperature: null,
    min_storage_temperature: null,
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
      const response = await axios.post('http://localhost:8000/Warehouse/', formData);
      console.log('Warehouse added successfully:', response.data);
      // You can perform additional actions after adding the warehouse
    } catch (error) {
      console.error('Error adding warehouse:', error);
    }
  };

  return (
    <div>
      <h1>Add Warehouse</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>Warehouse Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Online:</label>
        <input type="checkbox" name="online" checked={formData.online} onChange={handleCheckboxChange} />

        {/* Add other form fields as needed */}

        <button type="submit">Add Warehouse</button>
      </form>
    </div>
  );
};

export default AddWarehouse;
