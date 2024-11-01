import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">About Prop-er</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
        <p className="text-gray-700 mb-4">
          Prop-er is your all-in-one solution for tracking sports betting props and finding the best odds across multiple sportsbooks. 
          We help bettors make informed decisions by providing real-time updates and comprehensive odds comparisons.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Real-time prop bet tracking</li>
          <li>Multi-sportsbook odds comparison</li>
          <li>Live game updates</li>
        </ul>
      </section>
    </div>
  );
};

export default About; 