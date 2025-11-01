// components/DeleteOffice.tsx
import React from 'react';
import apiClient from 'src/services/apiClient';


interface DeleteOfficeProps {
  officeId: number;
}

const DeleteOffice: React.FC<DeleteOfficeProps> = ({ officeId }) => {
  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`/Office/${officeId}/`);
      console.log('Office deleted successfully:', response.data);

      // You can perform additional actions after deleting the office
    } catch (error) {
      console.error('Error deleting office:', error);
    }
  };

  return (
    <div>
      <h1>Delete Office</h1>
      <button onClick={handleDelete}>Delete Office</button>
    </div>
  );
};

export default DeleteOffice;
