
// components/DeleteStore.tsx
import React from 'react';
import axios from 'axios';

interface DeleteStoreProps {
  StorerId: number;
}

const DeleteStore: React.FC<DeleteStoreProps> = ({ StoreId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/Store/${StoreId}/`);
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
