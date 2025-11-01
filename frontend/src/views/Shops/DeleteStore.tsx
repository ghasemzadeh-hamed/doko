// components/DeleteStore.tsx
import React from 'react';
import apiClient from 'src/services/apiClient';


interface DeleteStoreProps {
  StorerId: number;
}

const DeleteStore: React.FC<DeleteStoreProps> = ({ StoreId }) => {
  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`/Store/${StoreId}/`);
      console.log('Store deleted successfully:', response.data);

      // You can perform additional actions after deleting the Store
    } catch (error) {
      console.error('Error deleting Store:', error);
    }
  };

  return (
    <div>
      <h1>Delete Store</h1>
      <button onClick={handleDelete}>Delete Store</button>
    </div>
  );
};

export default DeleteStore;
