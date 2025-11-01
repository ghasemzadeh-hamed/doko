
// components/EditAddress.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EditAddressProps {
  addressId: number;
}

const EditAddress: React.FC<EditAddressProps> = ({ addressId }) => {
  const [formData, setFormData] = useState<Address>({
    id: addressId,
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

  useEffect(() => {
    axios.get<Address>(`http://localhost:8000/addresses/${addressId}/`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching address for edit:', error);
      });
  }, [addressId]);

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
      const response = await axios.put(`http://localhost:8000/addresses/${addressId}/`, formData);
      console.log('Address updated successfully:', response.data);
      // You can perform additional actions after updating the address
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  return (
    <div>
      <h1>Edit Address</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>Country:</label>
        <input type="text" name="country" value={formData.country} onChange={handleInputChange} />

        {/* Add other form fields as needed */}

        <button type="submit">Update Address</button>
      </form>
    </div>
  );
};

export default EditAddress;
