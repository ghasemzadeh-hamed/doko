
// components/DeleteServiceProvider.tsx
import React from 'react';
import axios from 'axios';

interface DeleteServiceProviderProps {
  serviceProviderId: number;
}

const DeleteServiceProvider: React.FC<DeleteServiceProviderProps> = ({ serviceProviderId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/ServiceProvider/${serviceProviderId}/`);
      console.log('Service Provider deleted successfully:', response.data);
      // You can perform additional actions after deleting the service provider
    } catch (error) {
      console.error('Error deleting service provider:', error);
    }
  };

  return (
    <div>
      <h1>Delete Service Provider</h1>
      <button onClick={handleDelete}>Delete Service Provider</button>
    </div>
  );
};

export default DeleteServiceProvider;
