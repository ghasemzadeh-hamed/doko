import { useState, useEffect } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8000/FinancialKeys/';

const FinancialKeysComponent = () => {
  const [financialKeys, setFinancialKeys] = useState([]);
  const [newFinancialKey, setNewFinancialKey] = useState({
    user: '',
    bank_account_number: '',
    tax_number: '',
  });
  const [editingFinancialKey, setEditingFinancialKey] = useState(null);

  useEffect(() => {
    fetchFinancialKeys();
  }, []);

  const fetchFinancialKeys = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setFinancialKeys(response.data);
    } catch (error) {
      console.error('Error fetching financial keys:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API_ENDPOINT, newFinancialKey);
      fetchFinancialKeys();
      setNewFinancialKey({
        user: '',
        bank_account_number: '',
        tax_number: '',
      });
    } catch (error) {
      console.error('Error adding financial key:', error);
    }
  };

  const handleEdit = (financialKey) => {
    setEditingFinancialKey(financialKey);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_ENDPOINT}${editingFinancialKey.id}/`, editingFinancialKey);
      fetchFinancialKeys();
      setEditingFinancialKey(null);
    } catch (error) {
      console.error('Error updating financial key:', error);
    }
  };

  const handleDelete = async (financialKeyId) => {
    try {
      await axios.delete(`${API_ENDPOINT}${financialKeyId}/`);
      fetchFinancialKeys();
    } catch (error) {
      console.error('Error deleting financial key:', error);
    }
  };

  return (
    <div>
      <h1>Financial Keys</h1>

      {/* List of Financial Keys */}
      {financialKeys.map((financialKey) => (
        <div key={financialKey.id}>
          <p>User: {financialKey.user}</p>
          <p>Bank Account Number: {financialKey.bank_account_number}</p>
          <p>Tax Number: {financialKey.tax_number}</p>
          <button onClick={() => handleEdit(financialKey)}>Edit</button>
          <button onClick={() => handleDelete(financialKey.id)}>Delete</button>
        </div>
      ))}

      {/* Add New Financial Key Form */}
      <div>
        <input
          type="text"
          placeholder="User"
          value={newFinancialKey.user}
          onChange={(e) => setNewFinancialKey({ ...newFinancialKey, user: e.target.value })}
        />
        <input
          type="text"
          placeholder="Bank Account Number"
          value={newFinancialKey.bank_account_number}
          onChange={(e) =>
            setNewFinancialKey({ ...newFinancialKey, bank_account_number: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Tax Number"
          value={newFinancialKey.tax_number}
          onChange={(e) => setNewFinancialKey({ ...newFinancialKey, tax_number: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Edit Financial Key Form */}
      {editingFinancialKey && (
        <div>
          <input
            type="text"
            placeholder="User"
            value={editingFinancialKey.user}
            onChange={(e) =>
              setEditingFinancialKey({ ...editingFinancialKey, user: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Bank Account Number"
            value={editingFinancialKey.bank_account_number}
            onChange={(e) =>
              setEditingFinancialKey({
                ...editingFinancialKey,
                bank_account_number: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Tax Number"
            value={editingFinancialKey.tax_number}
            onChange={(e) =>
              setEditingFinancialKey({ ...editingFinancialKey, tax_number: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingFinancialKey(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default FinancialKeysComponent;
