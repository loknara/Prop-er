import React from 'react';

const OddsTable = ({ propsData }) => {
  if (!propsData || propsData.length === 0) {
    return <div className="text-white text-center p-4">Loading props data...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-900/50 border border-gray-700/50">
        <thead>
          <tr className="bg-gray-800/80">
            <th className="p-3 border border-gray-700/50 text-white">Player</th>
            <th className="p-3 border border-gray-700/50 text-white">Team</th>
            <th className="p-3 border border-gray-700/50 text-white">Prop</th>
            <th className="p-3 border border-gray-700/50 text-white">Line</th>
            <th className="p-3 border border-gray-700/50 text-white text-center" colSpan="2">DraftKings</th>
            <th className="p-3 border border-gray-700/50 text-white text-center" colSpan="2">FanDuel</th>
            <th className="p-3 border border-gray-700/50 text-white text-center" colSpan="2">Caesars</th>
            <th className="p-3 border border-gray-700/50 text-white text-center" colSpan="2">Best Odds</th>
          </tr>
          <tr className="bg-gray-800/50">
            <th className="p-2 border border-gray-700/50" colSpan="4"></th>
            <th className="p-2 border border-gray-700/50 text-gray-300">Over</th>
            <th className="p-2 border border-gray-700/50 text-gray-300">Under</th>
            <th className="p-2 border border-gray-700/50 text-gray-300">Over</th>
            <th className="p-2 border border-gray-700/50 text-gray-300">Under</th>
            <th className="p-2 border border-gray-700/50 text-gray-300">Over</th>
            <th className="p-2 border border-gray-700/50 text-gray-300">Under</th>
            <th className="p-2 border border-gray-700/50 text-gray-300">Over</th>
            <th className="p-2 border border-gray-700/50 text-gray-300">Under</th>
          </tr>
        </thead>
        <tbody>
          {propsData.map((prop, index) => (
            <tr key={index} className="hover:bg-gray-800/70 text-gray-300">
              <td className="p-3 border border-gray-700/50 font-medium">{prop.player}</td>
              <td className="p-3 border border-gray-700/50">{prop.team}</td>
              <td className="p-3 border border-gray-700/50">{prop.propType}</td>
              <td className="p-3 border border-gray-700/50">{prop.line}</td>
              <td className={`p-3 border border-gray-700/50 ${prop.bestOdds.over.book === 'draftkings' ? 'bg-emerald-400/20 text-emerald-400' : ''}`}>
                {prop.odds.draftkings.over}
              </td>
              <td className={`p-3 border border-gray-700/50 ${prop.bestOdds.under.book === 'draftkings' ? 'bg-emerald-400/20 text-emerald-400' : ''}`}>
                {prop.odds.draftkings.under}
              </td>
              <td className={`p-3 border border-gray-700/50 ${prop.bestOdds.over.book === 'fanduel' ? 'bg-emerald-400/20 text-emerald-400' : ''}`}>
                {prop.odds.fanduel.over}
              </td>
              <td className={`p-3 border border-gray-700/50 ${prop.bestOdds.under.book === 'fanduel' ? 'bg-emerald-400/20 text-emerald-400' : ''}`}>
                {prop.odds.fanduel.under}
              </td>
              <td className={`p-3 border border-gray-700/50 ${prop.bestOdds.over.book === 'caesars' ? 'bg-emerald-400/20 text-emerald-400' : ''}`}>
                {prop.odds.caesars.over}
              </td>
              <td className={`p-3 border border-gray-700/50 ${prop.bestOdds.under.book === 'caesars' ? 'bg-emerald-400/20 text-emerald-400' : ''}`}>
                {prop.odds.caesars.under}
              </td>
              <td className="p-3 border border-gray-700/50 bg-emerald-400/20 text-emerald-400">
                {prop.bestOdds.over.odds} ({prop.bestOdds.over.book})
              </td>
              <td className="p-3 border border-gray-700/50 bg-emerald-400/20 text-emerald-400">
                {prop.bestOdds.under.odds} ({prop.bestOdds.under.book})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OddsTable; 