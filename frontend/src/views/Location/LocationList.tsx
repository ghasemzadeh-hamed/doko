// components/LocationList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Location {
  id: number;
  latitude: number | null;
  longitude: number | null;
  created_at: string; // Adjust the type based on the actual data type from your Django model
  updated_at: string; // Adjust the type based on the actual data type from your Django model
}

const LocationList: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    axios.get<Location[]>('http://localhost:8000/location/')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Locations</h1>
      <ul>
        {locations.map(location => (
          <li key={location.id}>
            {`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
