import React from 'react';

const Predictions: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          🎯 Make Predictions
        </h1>
        <div className="text-sm text-gray-600">
          2025-26 NBA Season
        </div>
      </div>

      {/* Upcoming Games - Based on your Fixtures table */}
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Upcoming Games</h2>
          
          {/* Sample fixtures based on your DB schema */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="font-semibold">Los Angeles Lakers</div>
                    <div className="text-sm text-gray-600">Away</div>
                  </div>
                  <span className="text-gray-400">@</span>
                  <div className="text-center">
                    <div className="font-semibold">Golden State Warriors</div>
                    <div className="text-sm text-gray-600">Home</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <div>Dec 15, 2025</div>
                  <div>7:00 PM PT</div>
                </div>
              </div>
              
              {/* Simplified prediction form - only scores needed */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Lakers Score (Away)</label>
                  <input type="number" className="input-field" placeholder="110" min="0" max="200" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Warriors Score (Home)</label>
                  <input type="number" className="input-field" placeholder="108" min="0" max="200" />
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                Winner will be determined automatically based on scores
              </div>
              
              <div className="mt-4">
                <button className="btn-primary">
                  Submit Prediction
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="font-semibold">Boston Celtics</div>
                    <div className="text-sm text-gray-600">Home</div>
                  </div>
                  <span className="text-gray-400">vs</span>
                  <div className="text-center">
                    <div className="font-semibold">Miami Heat</div>
                    <div className="text-sm text-gray-600">Away</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <div>Dec 16, 2025</div>
                  <div>8:00 PM ET</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Celtics Score (Home)</label>
                  <input type="number" className="input-field" placeholder="115" min="0" max="200" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Heat Score (Away)</label>
                  <input type="number" className="input-field" placeholder="112" min="0" max="200" />
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                Winner will be determined automatically based on scores
              </div>
              
              <div className="mt-4">
                <button className="btn-primary">
                  Submit Prediction
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* My Recent Predictions - Based on Predictions table */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">My Recent Predictions</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <div className="space-y-1">
                <div className="font-medium">Lakers @ Warriors</div>
                <div className="text-sm text-gray-600">
                  Predicted: Lakers 110, Warriors 108 (Lakers win) | Actual: Lakers 112, Warriors 105
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-600 font-semibold">+5 points</div>
                <div className="text-xs text-gray-500">Winner + Close score</div>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <div className="space-y-1">
                <div className="font-medium">Celtics vs Heat</div>
                <div className="text-sm text-gray-600">
                  Predicted: Celtics 115, Heat 112 (Celtics win)
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-500">Game not completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;