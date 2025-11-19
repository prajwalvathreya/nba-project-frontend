import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          🏀 NBA Prediction League
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Compete with friends in predicting NBA game outcomes. 
          Join groups, make predictions, and climb the leaderboard!
        </p>
        
        <div className="space-x-4">
          <button className="btn-primary text-lg px-8 py-3">
            Get Started
          </button>
          <button className="btn-secondary text-lg px-8 py-3">
            Sign In
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="card text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-3">Make Predictions</h3>
          <p className="text-gray-600">
            Predict scores and winners for upcoming NBA games. 
            Earn points based on accuracy.
          </p>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-semibold mb-3">Join Groups</h3>
          <p className="text-gray-600">
            Create or join prediction groups with friends, family, 
            or coworkers to compete together.
          </p>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold mb-3">Climb Leaderboards</h3>
          <p className="text-gray-600">
            Track your ranking in each group and see how you 
            stack up against other predictors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;