import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EditLocationProps {
  locationId: number;
}

const EditLocation: React.FC<EditLocationProps> = ({ locationId }) => {
  const [formData, setFormData] = useState<Location>({
    id: locationId,
    latitude: null,
    longitude: null,
    created_at: '', // Adjust the type based on the actual data type from your Django model
    updated_at: '', // Adjust the type based on the actual data type from your Django model
  });

  useEffect(() => {
    axios.get<Location>(`http://localhost:8000/location/${locationId}/`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching location for edit:', error);
      });
  }, [locationId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value === '' ? null : parseFloat(e.target.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8000/location/${locationId}/`, formData);
      console.log('Location updated successfully:', response.data);
      // You can perform additional actions after updating the location
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  return (
    <div>
      <h1>Edit Location</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>Latitude:</label>
        <input type="number" name="latitude" value={formData.latitude || ''} onChange={handleInputChange} />

        <label>Longitude:</label>
        <input type="number" name="longitude" value={formData.longitude || ''} onChange={handleInputChange} />

        <button type="submit">Update Location</button>
      </form>
    </div>
  );
};

export default EditLocation;
