import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        🏀 Dashboard
      </h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">My Groups</h3>
          <p className="text-gray-600">Your prediction groups will appear here.</p>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Recent Predictions</h3>
          <p className="text-gray-600">Your latest predictions will appear here.</p>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">My Stats</h3>
          <p className="text-gray-600">Your prediction statistics will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;