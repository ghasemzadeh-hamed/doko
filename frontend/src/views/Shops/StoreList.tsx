// components/Store.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Store {
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

const StoreList: React.FC = () => {
  const [store, setStore] = useState<Store[]>([]);

  useEffect(() => {
    axios.get<Store[]>('http://localhost:8000/stores/')
      .then(response => {
        setStore(response.data);
      })
      .catch(error => {
        console.error('Error fetching store:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Store</h1>
      <ul>
        {store.map(store => (
          <li key={store.id}>
            {`Store Name: ${store.name}, Online: ${store.online ? 'Yes' : 'No'}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
