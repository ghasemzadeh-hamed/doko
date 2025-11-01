// components/EditServiceProvider.tsx
import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';


interface EditStoreProps {
  StorerId: number;
}

const EditStore: React.FC<EditStoreProps> = ({ storeId }) => {
  const [formData, setFormData] = useState<Store>({
    id: storeId,
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
    apiClient.get<Store>(`/Store/${storeId}/`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching store for edit:', error);
      });
  }, [storeId]);

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
      const response = await apiClient.put(`/Store/${storeId}/`, formData);
      console.log('Store updated successfully:', response.data);

      // You can perform additional actions after updating the store
    } catch (error) {
      console.error('Error updating store:', error);
    }
  };

  return (
    <div>
      <h1>Edit Store</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>Store</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Online:</label>
        <input type="checkbox" name="online" checked={formData.online} onChange={handleCheckboxChange} />

        {/* Add other form fields as needed */}

        <button type="submit">Update Store</button>
      </form>
    </div>
  );
};

export default EditStore;
