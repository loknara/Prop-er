import React from 'react';

const ValuePlays = ({ sport, market }) => {
  // This is a placeholder. You'll want to calculate real value plays
  const mockValuePlays = [
    {
      id: 1,
      player: 'Player 1',
      bestOdds: '-110',
      book: 'FanDuel',
      ev: '+2.3%',
    },
    // Add more mock data as needed
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Value Plays</h2>
      <div className="space-y-4">
        {mockValuePlays.map((play) => (
          <div key={play.id} className="border-b pb-2">
            <div className="font-semibold">{play.player}</div>
            <div className="text-sm text-gray-600">
              Best odds: {play.bestOdds} ({play.book})
            </div>
            <div className="text-sm text-green-600">
              Expected Value: {play.ev}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuePlays; 