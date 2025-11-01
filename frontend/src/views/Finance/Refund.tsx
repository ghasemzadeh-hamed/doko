import { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

const API_ENDPOINT = '/Refund/';

const RefundComponent = () => {
  const [refunds, setRefunds] = useState([]);
  const [newRefund, setNewRefund] = useState({
    customer: '',
    amount: null,
    description: '',
  });
  const [editingRefund, setEditingRefund] = useState(null);

  useEffect(() => {
    fetchRefunds();
  }, []);

  const fetchRefunds = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINT);
      setRefunds(response.data);
    } catch (error) {
      console.error('Error fetching refunds:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await apiClient.post(API_ENDPOINT, newRefund);
      fetchRefunds();
      setNewRefund({
        customer: '',
        amount: null,
        description: '',
      });
    } catch (error) {
      console.error('Error adding refund:', error);
    }
  };

  const handleEdit = (refund) => {
    setEditingRefund(refund);
  };

  const handleUpdate = async () => {
    try {
      await apiClient.put(`${API_ENDPOINT}${editingRefund.id}/`, editingRefund);
      fetchRefunds();
      setEditingRefund(null);
    } catch (error) {
      console.error('Error updating refund:', error);
    }
  };

  const handleDelete = async (refundId) => {
    try {
      await apiClient.delete(`${API_ENDPOINT}${refundId}/`);
      fetchRefunds();
    } catch (error) {
      console.error('Error deleting refund:', error);
    }
  };

  return (
    <div>
      <h1>Refunds</h1>

      {/* List of Refunds */}
      {refunds.map((refund) => (
        <div key={refund.id}>
          <p>Customer: {refund.customer}</p>
          <p>Amount: {refund.amount}</p>
          <p>Description: {refund.description}</p>
          <button onClick={() => handleEdit(refund)}>Edit</button>
          <button onClick={() => handleDelete(refund.id)}>Delete</button>
        </div>
      ))}

      {/* Add New Refund Form */}
      <div>
        <input
          type="text"
          placeholder="Customer"
          value={newRefund.customer}
          onChange={(e) => setNewRefund({ ...newRefund, customer: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newRefund.amount}
          onChange={(e) => setNewRefund({ ...newRefund, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newRefund.description}
          onChange={(e) => setNewRefund({ ...newRefund, description: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Edit Refund Form */}
      {editingRefund && (
        <div>
          <input
            type="text"
            placeholder="Customer"
            value={editingRefund.customer}
            onChange={(e) => setEditingRefund({ ...editingRefund, customer: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={editingRefund.amount}
            onChange={(e) => setEditingRefund({ ...editingRefund, amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingRefund.description}
            onChange={(e) => setEditingRefund({ ...editingRefund, description: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingRefund(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default RefundComponent;
