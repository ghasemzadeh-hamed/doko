// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// ** Icons Imports
import EditOutline from 'mdi-material-ui/PencilOutline';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';

// ** Axios Import
import apiClient from 'src/services/apiClient';

const API_ENDPOINT = '/MarketAnalysis/';

const MarketAnalysisComponent = () => {
  // ** State
  const [marketAnalyses, setMarketAnalyses] = useState([]);
  const [editingMarketAnalysis, setEditingMarketAnalysis] = useState(null);

  useEffect(() => {
    // Fetch market analyses from the Django API on component mount
    fetchMarketAnalyses();
  }, []);

  const fetchMarketAnalyses = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINT);
      setMarketAnalyses(response.data);
    } catch (error) {
      console.error('Error fetching market analyses:', error);
    }
  };

  const handleEdit = (marketAnalysis) => {
    setEditingMarketAnalysis(marketAnalysis);
  };

  const handleDelete = async (marketAnalysisId) => {
    try {
      await apiClient.delete(`${API_ENDPOINT}${marketAnalysisId}/`);
      console.log('Market analysis deleted successfully');
      fetchMarketAnalyses(); // Fetch market analyses again after deletion
    } catch (error) {
      console.error('Error deleting market analysis:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingMarketAnalysis) {
        // Update existing market analysis
        await apiClient.put(`${API_ENDPOINT}${editingMarketAnalysis.id}/`, editingMarketAnalysis);
        console.log('Market analysis updated successfully');
      } else {
        // Create new market analysis
        const newMarketAnalysis = {
          // Add other fields as needed
        };
        await apiClient.post(API_ENDPOINT, newMarketAnalysis);
        console.log('New market analysis added successfully');
      }

      fetchMarketAnalyses(); // Fetch market analyses again after saving
      setEditingMarketAnalysis(null); // Clear editing state
    } catch (error) {
      console.error('Error saving market analysis:', error);
    }
  };

  const handleCancel = () => {
    setEditingMarketAnalysis(null); // Clear editing state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Market Analyses
      </Typography>

      {/* List of Market Analyses */}
      {marketAnalyses.map((marketAnalysis) => (
        <Box key={marketAnalysis.id}>
          <Typography variant="body1">{marketAnalysis.project.name}</Typography>
          <Typography variant="body1">{marketAnalysis.market_research}</Typography>
          <Typography variant="body1">{marketAnalysis.competitors_analysis}</Typography>
          {/* Add more fields here */}
          <Button onClick={() => handleEdit(marketAnalysis)}>
            <EditOutline />
            Edit
          </Button>
          <Button onClick={() => handleDelete(marketAnalysis.id)}>
            <DeleteOutline />
            Delete
          </Button>
        </Box>
      ))}

      {/* Edit Market Analysis Form */}
      {editingMarketAnalysis && (
        <Box>
          {/* Edit Market Analysis Fields */}
          {/* For simplicity, you can use standard HTML input fields or customize with MUI components */}
          <input
            type="text"
            placeholder="Market Research"
            value={editingMarketAnalysis.market_research}
            onChange={(e) => setEditingMarketAnalysis({ ...editingMarketAnalysis, market_research: e.target.value })}
          />
          {/* Add more fields here */}

          {/* Save and Cancel Buttons */}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}

      {/* Add New Market Analysis Button */}
      <Button onClick={() => setEditingMarketAnalysis({ market_research: '' })}>Add New Market Analysis</Button>
    </Box>
  );
};

export default MarketAnalysisComponent;
