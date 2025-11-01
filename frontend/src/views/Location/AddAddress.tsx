import React, { useState } from 'react';
import axios from 'axios';

const AddAddress: React.FC = () => {
  const [formData, setFormData] = useState({
    country: '',
    province: '',
    city: '',
    latitude: null,
    longitude: null,
    street: '',
    alley: null,
    plaque: null,
    default: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      const response = await axios.post('http://localhost:8000/addresses/', formData);
      console.log('Address added successfully:', response.data);
      // You can perform additional actions after adding the address
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <div>
      <h1>Add Address</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>Country:</label>
        <input type="text" name="country" value={formData.country} onChange={handleInputChange} />

        {/* Add other form fields as needed */}

        <button type="submit">Add Address</button>
      </form>
    </div>
  );
};

export default AddAddress;
