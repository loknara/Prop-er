import React from 'react';

const AboutContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-2xl shadow-xl border border-gray-700/50 backdrop-blur-sm p-8">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-white">About </span>
          <span className="text-emerald-400">Prop-er</span>
        </h1>
        
        <div className="space-y-6 text-gray-300">
          <p>
            Prop-er is your ultimate companion for sports betting analytics and prop bet comparisons.
            Our platform helps you make informed decisions by providing real-time odds comparisons
            across major sportsbooks.
          </p>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
            <h2 className="text-xl font-bold text-emerald-400 mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Real-time sports scores and updates</li>
              <li>Player statistics and performance tracking</li>
              <li>Cross-platform odds comparison</li>
              <li>Value bet identification</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
            <h2 className="text-xl font-bold text-emerald-400 mb-4">How It Works</h2>
            <p>
              Our platform aggregates data from multiple sources to provide you with
              the most accurate and up-to-date information for making informed betting decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent; 