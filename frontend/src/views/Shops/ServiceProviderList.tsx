// components/ServiceProviderList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ServiceProvider {
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

const ServiceProviderList: React.FC = () => {
  const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>([]);

  useEffect(() => {
    axios.get<ServiceProvider[]>('http://localhost:8000/ServiceProvider/')
      .then(response => {
        setServiceProviders(response.data);
      })
      .catch(error => {
        console.error('Error fetching service providers:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Service Providers</h1>
      <ul>
        {serviceProviders.map(serviceProvider => (
          <li key={serviceProvider.id}>
            {`Service Provider Name: ${serviceProvider.name}, Online: ${serviceProvider.online ? 'Yes' : 'No'}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceProviderList;
