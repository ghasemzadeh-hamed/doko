// components/OfficeList.tsx
import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';


interface Office {
  id: number;
  name: string;
  online: boolean;
  location: {
    id: number;
    latitude: number | null;
    longitude: number | null;

    // Add other fields from your Address model as needed
  };
  managers: {
    id: number;

    // Add other fields from your Seller model as needed
  }[];
  cashiers: {
    id: number;

    // Add other fields from your Seller model as needed
  }[];
  apprentice: {
    id: number;

    // Add other fields from your Seller model as needed
  }[];
}

const OfficeList: React.FC = () => {
  const [offices, setOffices] = useState<Office[]>([]);

  useEffect(() => {
    apiClient.get<Office[]>('/Office/')
      .then(response => {
        setOffices(response.data);
      })
      .catch(error => {
        console.error('Error fetching offices:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Offices</h1>
      <ul>
        {offices.map(office => (
          <li key={office.id}>
            {`Office Name: ${office.name}, Online: ${office.online ? 'Yes' : 'No'}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfficeList;
