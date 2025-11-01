import React from 'react';
import apiClient from 'src/services/apiClient';


interface DeleteAddressProps {
  addressId: number;
}

const DeleteAddress: React.FC<DeleteAddressProps> = ({ addressId }) => {
  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`/addresses/${addressId}/`);
      console.log('Address deleted successfully:', response.data);

      // You can perform additional actions after deleting the address
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <div>
      <h1>Delete Address</h1>
      <button onClick={handleDelete}>Delete Address</button>
    </div>
  );
};

export default DeleteAddress;
