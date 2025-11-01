// components/WarehouseList.tsx
import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';


interface Warehouse {
  id: number;
  name: string;
  online: boolean;
  capacity: number | null;
  max_capacity: number | null;
  max_storage_temperature: number | null;
  min_storage_temperature: number | null;
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

const WarehouseList: React.FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    apiClient.get<Warehouse[]>('/Warehouse/')
      .then(response => {
        setWarehouses(response.data);
      })
      .catch(error => {
        console.error('Error fetching warehouses:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Warehouses</h1>
      <ul>
        {warehouses.map(warehouse => (
          <li key={warehouse.id}>
            {`Warehouse Name: ${warehouse.name}, Online: ${warehouse.online ? 'Yes' : 'No'}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WarehouseList;
