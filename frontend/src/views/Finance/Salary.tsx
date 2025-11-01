import { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

const API_ENDPOINT = '/Salary/';

const SalaryComponent = () => {
  const [salaries, setSalaries] = useState([]);
  const [newSalary, setNewSalary] = useState({
    user: '',
    amount: null,
    payment_date: '',
    description: '',
  });
  const [editingSalary, setEditingSalary] = useState(null);

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINT);
      setSalaries(response.data);
    } catch (error) {
      console.error('Error fetching salaries:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await apiClient.post(API_ENDPOINT, newSalary);
      fetchSalaries();
      setNewSalary({
        user: '',
        amount: null,
        payment_date: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding salary:', error);
    }
  };

  const handleEdit = (salary) => {
    setEditingSalary(salary);
  };

  const handleUpdate = async () => {
    try {
      await apiClient.put(`${API_ENDPOINT}${editingSalary.id}/`, editingSalary);
      fetchSalaries();
      setEditingSalary(null);
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };

  const handleDelete = async (salaryId) => {
    try {
      await apiClient.delete(`${API_ENDPOINT}${salaryId}/`);
      fetchSalaries();
    } catch (error) {
      console.error('Error deleting salary:', error);
    }
  };

  return (
    <div>
      <h1>Salaries</h1>

      {/* List of Salaries */}
      {salaries.map((salary) => (
        <div key={salary.id}>
          <p>User: {salary.user}</p>
          <p>Amount: {salary.amount}</p>
          <p>Payment Date: {salary.payment_date}</p>
          <p>Description: {salary.description}</p>
          <button onClick={() => handleEdit(salary)}>Edit</button>
          <button onClick={() => handleDelete(salary.id)}>Delete</button>
        </div>
      ))}

      {/* Add New Salary Form */}
      <div>
        <input
          type="text"
          placeholder="User"
          value={newSalary.user}
          onChange={(e) => setNewSalary({ ...newSalary, user: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newSalary.amount}
          onChange={(e) => setNewSalary({ ...newSalary, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Payment Date"
          value={newSalary.payment_date}
          onChange={(e) => setNewSalary({ ...newSalary, payment_date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newSalary.description}
          onChange={(e) => setNewSalary({ ...newSalary, description: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Edit Salary Form */}
      {editingSalary && (
        <div>
          <input
            type="text"
            placeholder="User"
            value={editingSalary.user}
            onChange={(e) => setEditingSalary({ ...editingSalary, user: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={editingSalary.amount}
            onChange={(e) => setEditingSalary({ ...editingSalary, amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Payment Date"
            value={editingSalary.payment_date}
            onChange={(e) => setEditingSalary({ ...editingSalary, payment_date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingSalary.description}
            onChange={(e) => setEditingSalary({ ...editingSalary, description: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingSalary(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default SalaryComponent;
