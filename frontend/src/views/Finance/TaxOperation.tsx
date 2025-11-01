import { useState, useEffect } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8000/TaxOperation/';

const TaxOperationComponent = () => {
  const [taxOperations, setTaxOperations] = useState([]);
  const [newTaxOperation, setNewTaxOperation] = useState({
    user: '',
    operation_type: '',
    amount: '',
    // other fields
  });
  const [editingTaxOperation, setEditingTaxOperation] = useState(null);

  useEffect(() => {
    fetchTaxOperations();
  }, []);

  const fetchTaxOperations = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setTaxOperations(response.data);
    } catch (error) {
      console.error('Error fetching tax operations:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API_ENDPOINT, newTaxOperation);
      fetchTaxOperations();
      setNewTaxOperation({
        user: '',
        operation_type: '',
        amount: '',
        // reset other fields
      });
    } catch (error) {
      console.error('Error adding tax operation:', error);
    }
  };

  const handleEdit = (taxOperation) => {
    setEditingTaxOperation(taxOperation);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_ENDPOINT}${editingTaxOperation.id}/`, editingTaxOperation);
      fetchTaxOperations();
      setEditingTaxOperation(null);
    } catch (error) {
      console.error('Error updating tax operation:', error);
    }
  };

  const handleDelete = async (taxOperationId) => {
    try {
      await axios.delete(`${API_ENDPOINT}${taxOperationId}/`);
      fetchTaxOperations();
    } catch (error) {
      console.error('Error deleting tax operation:', error);
    }
  };

  return (
    <div>
      <h1>Tax Operations</h1>

      {/* List of Tax Operations */}
      {taxOperations.map((taxOperation) => (
        <div key={taxOperation.id}>
          <p>User: {taxOperation.user}</p>
          <p>Operation Type: {taxOperation.operation_type}</p>
          <p>Amount: {taxOperation.amount}</p>
          {/* display other fields */}
          <button onClick={() => handleEdit(taxOperation)}>Edit</button>
          <button onClick={() => handleDelete(taxOperation.id)}>Delete</button>
        </div>
      ))}

      {/* Add New Tax Operation Form */}
      <div>
        <input
          type="text"
          placeholder="User"
          value={newTaxOperation.user}
          onChange={(e) => setNewTaxOperation({ ...newTaxOperation, user: e.target.value })}
        />
        <input
          type="text"
          placeholder="Operation Type"
          value={newTaxOperation.operation_type}
          onChange={(e) =>
            setNewTaxOperation({ ...newTaxOperation, operation_type: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Amount"
          value={newTaxOperation.amount}
          onChange={(e) => setNewTaxOperation({ ...newTaxOperation, amount: e.target.value })}
        />
        {/* include other input fields */}
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Edit Tax Operation Form */}
      {editingTaxOperation && (
        <div>
          <input
            type="text"
            placeholder="User"
            value={editingTaxOperation.user}
            onChange={(e) =>
              setEditingTaxOperation({ ...editingTaxOperation, user: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Operation Type"
            value={editingTaxOperation.operation_type}
            onChange={(e) =>
              setEditingTaxOperation({ ...editingTaxOperation, operation_type: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Amount"
            value={editingTaxOperation.amount}
            onChange={(e) =>
              setEditingTaxOperation({ ...editingTaxOperation, amount: e.target.value })
            }
          />
          {/* include other input fields */}
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingTaxOperation(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaxOperationComponent;
