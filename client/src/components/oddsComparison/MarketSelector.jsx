import React from 'react';

const MarketSelector = ({ selectedMarket, setSelectedMarket }) => {
  const markets = ['props', 'spreads', 'moneyline', 'totals'];

  return (
    <div className="flex space-x-2">
      {markets.map(market => (
        <button
          key={market}
          className={`px-4 py-2 rounded ${
            selectedMarket === market 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setSelectedMarket(market)}
        >
          {market.charAt(0).toUpperCase() + market.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default MarketSelector; 