import React, { useState } from 'react';
import axios from 'axios';

const AddLocation: React.FC = () => {
  const [formData, setFormData] = useState({
    latitude: null,
    longitude: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value === '' ? null : parseFloat(e.target.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/location/', formData);
      console.log('Location added successfully:', response.data);
      // You can perform additional actions after adding the location
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  return (
    <div>
      <h1>Add Location</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>Latitude:</label>
        <input type="number" name="latitude" value={formData.latitude || ''} onChange={handleInputChange} />

        <label>Longitude:</label>
        <input type="number" name="longitude" value={formData.longitude || ''} onChange={handleInputChange} />

        <button type="submit">Add Location</button>
      </form>
    </div>
  );
};

export default AddLocation;
