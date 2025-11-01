// components/DeleteWarehouse.tsx
import React from 'react';
import apiClient from 'src/services/apiClient';


interface DeleteWarehouseProps {
  warehouseId: number;
}

const DeleteWarehouse: React.FC<DeleteWarehouseProps> = ({ warehouseId }) => {
  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`/Warehouse/${warehouseId}/`);
      console.log('Warehouse deleted successfully:', response.data);

      // You can perform additional actions after deleting the warehouse
    } catch (error) {
      console.error('Error deleting warehouse:', error);
    }
  };

  return (
    <div>
      <h1>Delete Warehouse</h1>
      <button onClick={handleDelete}>Delete Warehouse</button>
    </div>
  );
};

export default DeleteWarehouse;
