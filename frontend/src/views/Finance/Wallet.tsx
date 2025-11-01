import { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

const API_ENDPOINT = '/Wallet/';

const WalletComponent = () => {
  const [wallets, setWallets] = useState([]);
  const [editingWallet, setEditingWallet] = useState(null);
  const [newWallet, setNewWallet] = useState({
    user: null,
    balance: null,
  });

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINT);
      setWallets(response.data);
    } catch (error) {
      console.error('Error fetching wallets:', error);
    }
  };

  const handleEdit = (wallet) => {
    setEditingWallet(wallet);
  };

  const handleDelete = async (walletId) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINT}${walletId}/`);
      console.log('Wallet deleted successfully:', response.data);
      fetchWallets();
    } catch (error) {
      console.error('Error deleting wallet:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingWallet) {
        const response = await apiClient.put(`${API_ENDPOINT}${editingWallet.id}/`, editingWallet);
        console.log('Wallet updated successfully:', response.data);
      } else {
        const response = await apiClient.post(API_ENDPOINT, newWallet);
        console.log('New wallet added successfully:', response.data);
      }

      fetchWallets();
      setEditingWallet(null);
      setNewWallet({
        user: null,
        balance: null,
      });
    } catch (error) {
      console.error('Error saving wallet:', error);
    }
  };

  const handleCancel = () => {
    setEditingWallet(null);
    setNewWallet({
      user: null,
      balance: null,
    });
  };

  return (
    <div>
      {/* Display Wallets */}
      {wallets.map((wallet) => (
        <div key={wallet.id}>
          {/* Display wallet details as needed */}
          <p>User: {wallet.user}</p>
          <p>Balance: {wallet.balance}</p>

          {/* Edit and Delete Buttons */}
          <button onClick={() => handleEdit(wallet)}>Edit</button>
          <button onClick={() => handleDelete(wallet.id)}>Delete</button>
        </div>
      ))}

      {/* Edit Wallet Form */}
      {editingWallet && (
        <div>
          {/* Edit Wallet Fields */}
          <input
            type="text"
            placeholder="User"
            value={editingWallet.user}
            onChange={(e) => setEditingWallet({ ...editingWallet, user: e.target.value })}
          />
          <input
            type="number"
            placeholder="Balance"
            value={editingWallet.balance}
            onChange={(e) => setEditingWallet({ ...editingWallet, balance: e.target.value })}
          />

          {/* Save and Cancel Buttons */}
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}

      {/* Add New Wallet Form */}
      <div>
        {/* Add Wallet Fields */}
        <input
          type="text"
          placeholder="User"
          value={newWallet.user}
          onChange={(e) => setNewWallet({ ...newWallet, user: e.target.value })}
        />
        <input
          type="number"
          placeholder="Balance"
          value={newWallet.balance}
          onChange={(e) => setNewWallet({ ...newWallet, balance: e.target.value })}
        />

        {/* Save and Cancel Buttons */}
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default WalletComponent;
