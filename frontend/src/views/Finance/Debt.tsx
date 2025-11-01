import { useState, useEffect } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8000/Debt/';

const DebtComponent = () => {
  const [debts, setDebts] = useState([]);
  const [newDebt, setNewDebt] = useState({
    seller: '',
    amount: '',
    description: '',
    debtor: '',
    is_paid: false,
  });
  const [editingDebt, setEditingDebt] = useState(null);

  useEffect(() => {
    fetchDebts();
  }, []);

  const fetchDebts = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setDebts(response.data);
    } catch (error) {
      console.error('Error fetching debts:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API_ENDPOINT, newDebt);
      fetchDebts();
      setNewDebt({
        seller: '',
        amount: '',
        description: '',
        debtor: '',
        is_paid: false,
      });
    } catch (error) {
      console.error('Error adding debt:', error);
    }
  };

  const handleEdit = (debt) => {
    setEditingDebt(debt);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_ENDPOINT}${editingDebt.id}/`, editingDebt);
      fetchDebts();
      setEditingDebt(null);
    } catch (error) {
      console.error('Error updating debt:', error);
    }
  };

  const handleDelete = async (debtId) => {
    try {
      await axios.delete(`${API_ENDPOINT}${debtId}/`);
      fetchDebts();
    } catch (error) {
      console.error('Error deleting debt:', error);
    }
  };

  return (
    <div>
      <h1>Debts</h1>

      {/* List of Debts */}
      {debts.map((debt) => (
        <div key={debt.id}>
          <p>Seller: {debt.seller}</p>
          <p>Amount: {debt.amount}</p>
          <p>Description: {debt.description}</p>
          <p>Debtor: {debt.debtor}</p>
          <p>Status: {debt.is_paid ? 'Paid' : 'Unpaid'}</p>
          <button onClick={() => handleEdit(debt)}>Edit</button>
          <button onClick={() => handleDelete(debt.id)}>Delete</button>
        </div>
      ))}

      {/* Add New Debt Form */}
      <div>
        <input
          type="text"
          placeholder="Seller"
          value={newDebt.seller}
          onChange={(e) => setNewDebt({ ...newDebt, seller: e.target.value })}
        />
        <input
          type="text"
          placeholder="Amount"
          value={newDebt.amount}
          onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDebt.description}
          onChange={(e) => setNewDebt({ ...newDebt, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Debtor"
          value={newDebt.debtor}
          onChange={(e) => setNewDebt({ ...newDebt, debtor: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Edit Debt Form */}
      {editingDebt && (
        <div>
          <input
            type="text"
            placeholder="Seller"
            value={editingDebt.seller}
            onChange={(e) => setEditingDebt({ ...editingDebt, seller: e.target.value })}
          />
          <input
            type="text"
            placeholder="Amount"
            value={editingDebt.amount}
            onChange={(e) => setEditingDebt({ ...editingDebt, amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingDebt.description}
            onChange={(e) => setEditingDebt({ ...editingDebt, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Debtor"
            value={editingDebt.debtor}
            onChange={(e) => setEditingDebt({ ...editingDebt, debtor: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingDebt(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DebtComponent;
