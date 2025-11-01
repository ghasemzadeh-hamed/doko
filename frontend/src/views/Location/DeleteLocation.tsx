import React from 'react';
import apiClient from 'src/services/apiClient';


interface DeleteLocationProps {
  locationId: number;
}

const DeleteLocation: React.FC<DeleteLocationProps> = ({ locationId }) => {
  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`/location/${locationId}/`);
      console.log('Location deleted successfully:', response.data);

      // You can perform additional actions after deleting the location
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <div>
      <h1>Delete Location</h1>
      <button onClick={handleDelete}>Delete Location</button>
    </div>
  );
};

export default DeleteLocation;
