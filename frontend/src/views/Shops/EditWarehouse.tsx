
// components/EditWarehouse.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EditWarehouseProps {
  warehouseId: number;
}

const EditWarehouse: React.FC<EditWarehouseProps> = ({ warehouseId }) => {
  const [formData, setFormData] = useState<Warehouse>({
    id: warehouseId,
    name: '',
    online: false,
    capacity: null,
    max_capacity: null,
    max_storage_temperature: null,
    min_storage_temperature: null,
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
    axios.get<Warehouse>(`http://localhost:8000/Warehouse/${warehouseId}/`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching warehouse for edit:', error);
      });
  }, [warehouseId]);

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
      const response = await axios.put(`http://localhost:8000/Warehouse/${warehouseId}/`, formData);
      console.log('Warehouse updated successfully:', response.data);
      // You can perform additional actions after updating the warehouse
    } catch (error) {
      console.error('Error updating warehouse:', error);
    }
  };

  return (
    <div>
      <h1>Edit Warehouse</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>Warehouse Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Online:</label>
        <input type="checkbox" name="online" checked={formData.online} onChange={handleCheckboxChange} />

        {/* Add other form fields as needed */}

        <button type="submit">Update Warehouse</button>
      </form>
    </div>
  );
};

export default EditWarehouse;
