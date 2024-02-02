import { useState, useEffect } from 'react';
import axios from 'axios';

const useScoreboardData = () => {
  const [scoreboardData, setScoreboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/scoreboard");
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


