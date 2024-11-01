import { useState, useEffect } from 'react';

const useOddsData = (selectedSport) => {
  const [propsData, setPropsData] = useState([]);

  useEffect(() => {
    // This is where you'll fetch real data from your API
    const mockPropsData = [
      {
        player: 'LeBron James',
        team: 'LAL',
        propType: 'Points',
        line: 25.5,
        odds: {
          draftkings: { over: -110, under: -110 },
          fanduel: { over: -115, under: -105 },
          caesars: { over: -108, under: -112 },
        },
        bestOdds: {
          over: { book: 'caesars', odds: -108 },
          under: { book: 'fanduel', odds: -105 }
        }
      },
      // ... more mock data
    ];

    setPropsData(mockPropsData);
  }, [selectedSport]);

  return { propsData };
};

export default useOddsData; 