import { useState, useEffect } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8000/TaxSetting/';

const TaxSettingComponent = () => {
  const [taxSettings, setTaxSettings] = useState([]);
  const [newTaxSetting, setNewTaxSetting] = useState({
    tax_name: '',
    tax_rate: 0.0,
  });
  const [editingTaxSetting, setEditingTaxSetting] = useState(null);

  useEffect(() => {
    fetchTaxSettings();
  }, []);

  const fetchTaxSettings = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setTaxSettings(response.data);
    } catch (error) {
      console.error('Error fetching tax settings:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API_ENDPOINT, newTaxSetting);
      fetchTaxSettings();
      setNewTaxSetting({
        tax_name: '',
        tax_rate: 0.0,
      });
    } catch (error) {
      console.error('Error adding tax setting:', error);
    }
  };

  const handleEdit = (taxSetting) => {
    setEditingTaxSetting(taxSetting);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_ENDPOINT}${editingTaxSetting.id}/`, editingTaxSetting);
      fetchTaxSettings();
      setEditingTaxSetting(null);
    } catch (error) {
      console.error('Error updating tax setting:', error);
    }
  };

  const handleDelete = async (taxSettingId) => {
    try {
      await axios.delete(`${API_ENDPOINT}${taxSettingId}/`);
      fetchTaxSettings();
    } catch (error) {
      console.error('Error deleting tax setting:', error);
    }
  };

  return (
    <div>
      <h1>Tax Settings</h1>

      {/* List of Tax Settings */}
      {taxSettings.map((taxSetting) => (
        <div key={taxSetting.id}>
          <p>Tax Name: {taxSetting.tax_name}</p>
          <p>Tax Rate: {taxSetting.tax_rate}</p>
          <button onClick={() => handleEdit(taxSetting)}>Edit</button>
          <button onClick={() => handleDelete(taxSetting.id)}>Delete</button>
        </div>
      ))}

      {/* Add New Tax Setting Form */}
      <div>
        <input
          type="text"
          placeholder="Tax Name"
          value={newTaxSetting.tax_name}
          onChange={(e) => setNewTaxSetting({ ...newTaxSetting, tax_name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Tax Rate"
          value={newTaxSetting.tax_rate}
          onChange={(e) => setNewTaxSetting({ ...newTaxSetting, tax_rate: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Edit Tax Setting Form */}
      {editingTaxSetting && (
        <div>
          <input
            type="text"
            placeholder="Tax Name"
            value={editingTaxSetting.tax_name}
            onChange={(e) =>
              setEditingTaxSetting({ ...editingTaxSetting, tax_name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Tax Rate"
            value={editingTaxSetting.tax_rate}
            onChange={(e) =>
              setEditingTaxSetting({ ...editingTaxSetting, tax_rate: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingTaxSetting(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaxSettingComponent;
