import { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

const API_ENDPOINT = '/DataAnalysis/';

const DataAnalysisComponent = () => {
  const [dataAnalysisItems, setDataAnalysisItems] = useState([]);
  const [newItem, setNewItem] = useState({ project: '', data_sources: '', data_analysis_report: '', tag: [] });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINT);
      setDataAnalysisItems(response.data);
    } catch (error) {
      console.error('Error fetching data analysis items:', error);
    }
  };

  const addItem = async () => {
    try {
      const response = await apiClient.post(API_ENDPOINT, newItem);
      console.log('New data analysis item added successfully:', response.data);
      fetchItems();
      setNewItem({ project: '', data_sources: '', data_analysis_report: '', tag: [] });
    } catch (error) {
      console.error('Error adding data analysis item:', error);
    }
  };

  const editItem = (item) => {
    setEditingItem(item);
  };

  const updateItem = async () => {
    try {
      const response = await apiClient.put(`${API_ENDPOINT}${editingItem.id}/`, editingItem);
      console.log('Data analysis item updated successfully:', response.data);
      fetchItems();
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating data analysis item:', error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINT}${itemId}/`);
      console.log('Data analysis item deleted successfully:', response.data);
      fetchItems();
    } catch (error) {
      console.error('Error deleting data analysis item:', error);
    }
  };

  return (
    <div>
      {/* Fetch List of Items */}
      <button onClick={fetchItems}>Fetch Data Analysis Items</button>

      {/* Add New Item */}
      <div>
        <input
          type="text"
          placeholder="Project"
          value={newItem.project}
          onChange={(e) => setNewItem({ ...newItem, project: e.target.value })}
        />
        <input
          type="text"
          placeholder="Data Sources"
          value={newItem.data_sources}
          onChange={(e) => setNewItem({ ...newItem, data_sources: e.target.value })}
        />
        <input
          type="text"
          placeholder="Data Analysis Report"
          value={newItem.data_analysis_report}
          onChange={(e) => setNewItem({ ...newItem, data_analysis_report: e.target.value })}
        />
        {/* You can include additional input fields for 'tag' */}
        <button onClick={addItem}>Add Data Analysis Item</button>
      </div>

      {/* Edit and Update Item */}
      {editingItem && (
        <div>
          <input
            type="text"
            placeholder="Project"
            value={editingItem.project}
            onChange={(e) => setEditingItem({ ...editingItem, project: e.target.value })}
          />
          <input
            type="text"
            placeholder="Data Sources"
            value={editingItem.data_sources}
            onChange={(e) => setEditingItem({ ...editingItem, data_sources: e.target.value })}
          />
          <input
            type="text"
            placeholder="Data Analysis Report"
            value={editingItem.data_analysis_report}
            onChange={(e) => setEditingItem({ ...editingItem, data_analysis_report: e.target.value })}
          />
          {/* You can include additional input fields for 'tag' */}
          <button onClick={updateItem}>Update Data Analysis Item</button>
        </div>
      )}

      {/* List of Items */}
      {dataAnalysisItems.map((item) => (
        <div key={item.id}>
          <span>{item.project}</span>
          <span>{item.data_sources}</span>
          <span>{item.data_analysis_report}</span>
          {/* You can display additional fields, including 'tag' */}
          <button onClick={() => editItem(item)}>Edit</button>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DataAnalysisComponent;
