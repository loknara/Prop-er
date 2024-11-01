import axios from 'axios';

const API_KEY = 'your_odds_api_key'; // You'll need to get this from an odds provider

export const fetchOdds = async (sport, market) => {
  try {
    const response = await axios.get(
      `https://api.the-odds-api.com/v4/sports/${sport}/odds`,
      {
        params: {
          apiKey: API_KEY,
          regions: 'us',
          markets: market,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching odds:', error);
    throw error;
  }
}; 