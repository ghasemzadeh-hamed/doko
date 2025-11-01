import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Address {
  id: number;
  country: string;
  province: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  street: string;
  alley?: string | null;
  plaque?: string | null;
  default: boolean;
}

const AddressList: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    axios.get<Address[]>('http://localhost:8000/addresses/')
      .then(response => {
        setAddresses(response.data);
      })
      .catch(error => {
        console.error('Error fetching addresses:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Addresses</h1>
      <ul>
        {addresses.map(address => (
          <li key={address.id}>
            {`${address.street}, ${address.city}, ${address.province}, ${address.country}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
