import { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

const API_ENDPOINT = '/RiskManagement/';

const RiskManagementComponent = () => {
  const [riskItems, setRiskItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchRiskItems();
  }, []);

  const fetchRiskItems = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINT);
      setRiskItems(response.data);
    } catch (error) {
      console.error('Error fetching risk items:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = async (itemId) => {
    try {
      await apiClient.delete(`${API_ENDPOINT}${itemId}/`);
      fetchRiskItems();
    } catch (error) {
      console.error('Error deleting risk item:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await apiClient.put(`${API_ENDPOINT}${editingItem.id}/`, editingItem);
      } else {
        const newItem = {
          // Add other fields as needed
        };
        await apiClient.post(API_ENDPOINT, newItem);
      }

      fetchRiskItems();
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving risk item:', error);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div>
      {/* List of Risk Management Items */}
      {riskItems.map((item) => (
        <div key={item.id}>
          {/* Display item fields as needed */}
          <p>{item.project}</p>
          <p>{item.risk_analysis}</p>
          <p>{item.risk_response_plan}</p>
          {/* Add more fields here */}
          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}

      {/* Edit Item Form */}
      {editingItem && (
        <div>
          {/* Edit Item Fields */}
          <input
            type="text"
            placeholder="Risk Analysis"
            value={editingItem.risk_analysis}
            onChange={(e) => setEditingItem({ ...editingItem, risk_analysis: e.target.value })}
          />
          <input
            type="text"
            placeholder="Risk Response Plan"
            value={editingItem.risk_response_plan}
            onChange={(e) => setEditingItem({ ...editingItem, risk_response_plan: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}

      {/* Add New Item Button */}
      <button onClick={() => setEditingItem({ risk_analysis: '', risk_response_plan: '' })}>Add New Risk Item</button>
    </div>
  );
};

export default RiskManagementComponent;
