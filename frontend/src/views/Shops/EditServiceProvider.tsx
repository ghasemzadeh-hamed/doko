// components/EditServiceProvider.tsx
import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';


interface EditServiceProviderProps {
  serviceProviderId: number;
}

const EditServiceProvider: React.FC<EditServiceProviderProps> = ({ serviceProviderId }) => {
  const [formData, setFormData] = useState<ServiceProvider>({
    id: serviceProviderId,
    name: '',
    online: false,
    location: {
      id: 0,
      latitude: null,
      longitude: null,
    },
    managers: [],
    cashiers: [],
    apprentice: [],
  });

  useEffect(() => {
    apiClient.get<ServiceProvider>(`/ServiceProvider/${serviceProviderId}/`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching service provider for edit:', error);
      });
  }, [serviceProviderId]);

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
      const response = await apiClient.put(`/ServiceProvider/${serviceProviderId}/`, formData);
      console.log('Service Provider updated successfully:', response.data);

      // You can perform additional actions after updating the service provider
    } catch (error) {
      console.error('Error updating service provider:', error);
    }
  };

  return (
    <div>
      <h1>Edit Service Provider</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>Service Provider Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Online:</label>
        <input type="checkbox" name="online" checked={formData.online} onChange={handleCheckboxChange} />

        {/* Add other form fields as needed */}

        <button type="submit">Update Service Provider</button>
      </form>
    </div>
  );
};

export default EditServiceProvider;
