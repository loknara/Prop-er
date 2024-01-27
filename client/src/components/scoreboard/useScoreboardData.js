import { useState, useEffect } from 'react';
import axios from 'axios';

const useScoreboardData = () => {
  const [scoreboardData, setScoreboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/scoreboard");
        setScoreboardData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return { scoreboardData, error };
};

export default useScoreboardData;


