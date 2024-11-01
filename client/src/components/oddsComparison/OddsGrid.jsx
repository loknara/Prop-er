import React from 'react';

const OddsGrid = ({ sport, market }) => {
  // This is a placeholder. You'll want to fetch real odds data here
  const mockOdds = [
    {
      id: 1,
      player: 'Player 1',
      fanduel: '-110',
      draftkings: '-115',
      caesars: '-108',
    },
    // Add more mock data as needed
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Odds Comparison</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Player/Team</th>
              <th className="px-4 py-2">FanDuel</th>
              <th className="px-4 py-2">DraftKings</th>
              <th className="px-4 py-2">Caesars</th>
            </tr>
          </thead>
          <tbody>
            {mockOdds.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="px-4 py-2">{row.player}</td>
                <td className="px-4 py-2">{row.fanduel}</td>
                <td className="px-4 py-2">{row.draftkings}</td>
                <td className="px-4 py-2">{row.caesars}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OddsGrid; 