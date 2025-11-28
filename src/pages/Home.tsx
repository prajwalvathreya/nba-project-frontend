import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-6xl font-extrabold text-nba-primary mb-4 tracking-tight flex items-center justify-center gap-2">
          <span role="img" aria-label="basketball">🏀</span> Hoops Predictor
        </h1>
        <p className="text-2xl text-gray-700 mb-8 max-w-xl mx-auto font-light">
          Predict NBA game outcomes, challenge your friends, and climb the leaderboard!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button className="btn-primary text-lg px-8 py-3 rounded-full shadow-lg">
            Get Started
          </button>
          <button className="btn-secondary text-lg px-8 py-3 rounded-full">
            Sign In
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2">Make Your Picks</h3>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
          <div className="text-5xl mb-4">👥</div>
          <h3 className="text-xl font-bold mb-2">Compete in Groups</h3>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="text-xl font-bold mb-2">Top the Leaderboard</h3>
        </div>
      </section>
    </div>
  );
};

export default Home;