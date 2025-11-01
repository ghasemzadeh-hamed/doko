// components/EditOffice.tsx
import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';


interface EditOfficeProps {
  officeId: number;
}

const EditOffice: React.FC<EditOfficeProps> = ({ officeId }) => {
  const [formData, setFormData] = useState<Office>({
    id: officeId,
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
    apiClient.get<Office>(`/Office/${officeId}/`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching office for edit:', error);
      });
  }, [officeId]);

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
      const response = await apiClient.put(`/Office/${officeId}/`, formData);
      console.log('Office updated successfully:', response.data);

      // You can perform additional actions after updating the office
    } catch (error) {
      console.error('Error updating office:', error);
    }
  };

  return (
    <div>
      <h1>Edit Office</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>Office Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Online:</label>
        <input type="checkbox" name="online" checked={formData.online} onChange={handleCheckboxChange} />

        {/* Add other form fields as needed */}

        <button type="submit">Update Office</button>
      </form>
    </div>
  );
};

export default EditOffice;
