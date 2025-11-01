import { useState, useEffect } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8000/TotalSales/';

const TotalSalesComponent = () => {
  const [totalSalesList, setTotalSalesList] = useState([]);
  const [newSaleAmount, setNewSaleAmount] = useState(0);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchTotalSales();
  }, []);

  const fetchTotalSales = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setTotalSalesList(response.data);
    } catch (error) {
      console.error('Error fetching total sales:', error);
    }
  };

  const handleAddSale = async () => {
    try {
      await axios.post(API_ENDPOINT, { sales: newSaleAmount });
      fetchTotalSales();
      setNewSaleAmount(0);
    } catch (error) {
      console.error('Error adding new sale:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleUpdateSale = async () => {
    try {
      await axios.put(`${API_ENDPOINT}${editingItem.id}/`, editingItem);
      fetchTotalSales();
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating sale:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${API_ENDPOINT}${itemId}/`);
      fetchTotalSales();
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

  return (
    <div>
      <h1>Total Sales</h1>

      {/* Display Total Sales List */}
      <ul>
        {totalSalesList.map((item) => (
          <li key={item.id}>
            {item.sales}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add New Sale */}
      <div>
        <input
          type="number"
          value={newSaleAmount}
          onChange={(e) => setNewSaleAmount(Number(e.target.value))}
        />
        <button onClick={handleAddSale}>Add Sale</button>
      </div>

      {/* Edit Sale */}
      {editingItem && (
        <div>
          <input
            type="number"
            value={editingItem.sales}
            onChange={(e) => setEditingItem({ ...editingItem, sales: Number(e.target.value) })}
          />
          <button onClick={handleUpdateSale}>Update Sale</button>
        </div>
      )}
    </div>
  );
};

export default TotalSalesComponent;
