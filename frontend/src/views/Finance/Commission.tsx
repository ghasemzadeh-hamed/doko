import { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

const API_ENDPOINT = '/Commission/';

const CommissionComponent = () => {
  const [commissions, setCommissions] = useState([]);
  const [newCommission, setNewCommission] = useState({ commission: null });

  useEffect(() => {
    fetchCommissions();
  }, []);

  const fetchCommissions = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINT);
      setCommissions(response.data);
    } catch (error) {
      console.error('Error fetching commissions:', error);
    }
  };

  const addCommission = async () => {
    try {
      const response = await apiClient.post(API_ENDPOINT, newCommission);
      console.log('New commission added successfully:', response.data);
      fetchCommissions();
      setNewCommission({ commission: null });
    } catch (error) {
      console.error('Error adding commission:', error);
    }
  };

  const editCommission = async (id, updatedCommission) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINT}${id}/`, updatedCommission);
      console.log('Commission updated successfully:', response.data);
      fetchCommissions();
    } catch (error) {
      console.error('Error updating commission:', error);
    }
  };

  const deleteCommission = async (id) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINT}${id}/`);
      console.log('Commission deleted successfully:', response.data);
      fetchCommissions();
    } catch (error) {
      console.error('Error deleting commission:', error);
    }
  };

  return (
    <div>
      <h2>Commissions</h2>

      {/* List of Commissions */}
      <ul>
        {commissions.map((commission) => (
          <li key={commission.id}>
            {commission.commission}
            <button onClick={() => editCommission(commission.id, { commission: commission.commission + 1 })}>
              Edit
            </button>
            <button onClick={() => deleteCommission(commission.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add New Commission Form */}
      <div>
        <h3>Add New Commission</h3>
        <input
          type="number"
          placeholder="Commission"
          value={newCommission.commission}
          onChange={(e) => setNewCommission({ commission: e.target.value })}
        />
        <button onClick={addCommission}>Add</button>
      </div>
    </div>
  );
};

export default CommissionComponent;
