import React, { useState } from 'react';
import SportSelector from '../components/oddsComparison/SportSelector';
import MarketSelector from '../components/oddsComparison/MarketSelector';
import OddsGrid from '../components/oddsComparison/OddsGrid';
import ValuePlays from '../components/oddsComparison/ValuePlays';

const OddsComparison = () => {
  const [selectedSport, setSelectedSport] = useState('NBA');
  const [selectedMarket, setSelectedMarket] = useState('props');

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Odds Comparison</h1>
        <p className="text-gray-600">Compare odds across major sportsbooks</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <SportSelector 
          selectedSport={selectedSport} 
          setSelectedSport={setSelectedSport} 
        />
        <MarketSelector 
          selectedMarket={selectedMarket} 
          setSelectedMarket={setSelectedMarket} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OddsGrid 
            sport={selectedSport} 
            market={selectedMarket} 
          />
        </div>
        <div>
          <ValuePlays 
            sport={selectedSport} 
            market={selectedMarket} 
          />
        </div>
      </div>
    </div>
  );
};

export default OddsComparison; 