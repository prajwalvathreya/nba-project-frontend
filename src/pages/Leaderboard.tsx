import React, { useState } from 'react';

const Leaderboard: React.FC = () => {
  const [showMoreGroup1, setShowMoreGroup1] = useState(false);
  const [showMoreGroup2, setShowMoreGroup2] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        🏆 Group Leaderboards
      </h1>

      <div className="space-y-8">
        {/* Group 1 Rankings */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">🏢 Work Squad (Group ID: 1)</h2>
            <div className="text-sm text-gray-600">12 members</div>
          </div>
          
          <div className="space-y-3">
            {/* Top 3 with medals */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">🥇</div>
                <div>
                  <div className="font-semibold">sarah_j</div>
                  <div className="text-sm text-gray-600">84% accuracy (27/32 correct)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-yellow-600">247 pts</div>
                <div className="text-sm text-gray-600">32 predictions</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">🥈</div>
                <div>
                  <div className="font-semibold">mike_chen</div>
                  <div className="text-sm text-gray-600">77% accuracy (23/30 correct)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-gray-600">215 pts</div>
                <div className="text-sm text-gray-600">30 predictions</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">🥉</div>
                <div>
                  <div className="font-semibold text-nba-primary">current_user</div>
                  <div className="text-sm text-gray-600">71% accuracy (20/28 correct)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-orange-600">198 pts</div>
                <div className="text-sm text-gray-600">28 predictions</div>
              </div>
            </div>

            {/* Ranks 4-5 always shown */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-8 text-center font-semibold text-gray-500">#4</div>
                <div>
                  <div className="font-medium">alex_rodriguez</div>
                  <div className="text-sm text-gray-600">68% accuracy (19/28 correct)</div>
                </div>
              </div>
              <div className="font-semibold">187 pts</div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-8 text-center font-semibold text-gray-500">#5</div>
                <div>
                  <div className="font-medium">lisa_wong</div>
                  <div className="text-sm text-gray-600">71% accuracy (20/28 correct)</div>
                </div>
              </div>
              <div className="font-semibold">172 pts</div>
            </div>

            {/* Expandable section for more members */}
            {showMoreGroup1 && (
              <div className="space-y-2 pt-2">
                {[
                  { rank: 6, username: "david_kim", points: 156, correct: 18, total: 26 },
                  { rank: 7, username: "emma_davis", points: 143, correct: 17, total: 25 },
                  { rank: 8, username: "tom_wilson", points: 138, correct: 16, total: 24 },
                  { rank: 9, username: "jane_smith", points: 125, correct: 15, total: 23 },
                  { rank: 10, username: "bob_johnson", points: 112, correct: 14, total: 22 },
                  { rank: 11, username: "carol_brown", points: 98, correct: 12, total: 20 },
                  { rank: 12, username: "steve_davis", points: 85, correct: 11, total: 18 },
                ].map((player) => (
                  <div key={player.rank} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 text-center font-semibold text-gray-500">#{player.rank}</div>
                      <div>
                        <div className="font-medium">{player.username}</div>
                        <div className="text-sm text-gray-600">
                          {Math.round((player.correct/player.total) * 100)}% accuracy ({player.correct}/{player.total} correct)
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold">{player.points} pts</div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowMoreGroup1(!showMoreGroup1)}
              className="w-full text-center py-2 text-nba-primary hover:text-blue-700 text-sm font-medium"
            >
              {showMoreGroup1 ? 'Show Less' : 'Show More Members (7 more)'}
            </button>
          </div>
        </div>

        {/* Group 2 Rankings */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">👨‍👩‍👧‍👦 Family Fun (Group ID: 2)</h2>
            <div className="text-sm text-gray-600">6 members</div>
          </div>
          
          <div className="space-y-3">
            {/* Top 3 with medals */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">🥇</div>
                <div>
                  <div className="font-semibold text-nba-primary">current_user</div>
                  <div className="text-sm text-gray-600">78% accuracy (25/32 correct)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-yellow-600">285 pts</div>
                <div className="text-sm text-gray-600">32 predictions</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">🥈</div>
                <div>
                  <div className="font-semibold">uncle_bob</div>
                  <div className="text-sm text-gray-600">75% accuracy (24/32 correct)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-gray-600">268 pts</div>
                <div className="text-sm text-gray-600">32 predictions</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">🥉</div>
                <div>
                  <div className="font-semibold">mom_jane</div>
                  <div className="text-sm text-gray-600">69% accuracy (22/32 correct)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-orange-600">245 pts</div>
                <div className="text-sm text-gray-600">32 predictions</div>
              </div>
            </div>

            {/* Remaining members (since only 6 total) */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-8 text-center font-semibold text-gray-500">#4</div>
                <div>
                  <div className="font-medium">dad_mike</div>
                  <div className="text-sm text-gray-600">66% accuracy (21/32 correct)</div>
                </div>
              </div>
              <div className="font-semibold">198 pts</div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-8 text-center font-semibold text-gray-500">#5</div>
                <div>
                  <div className="font-medium">sister_amy</div>
                  <div className="text-sm text-gray-600">63% accuracy (20/32 correct)</div>
                </div>
              </div>
              <div className="font-semibold">175 pts</div>
            </div>

            {/* Expandable section for last member */}
            {showMoreGroup2 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 text-center font-semibold text-gray-500">#6</div>
                    <div>
                      <div className="font-medium">cousin_joe</div>
                      <div className="text-sm text-gray-600">59% accuracy (19/32 correct)</div>
                    </div>
                  </div>
                  <div className="font-semibold">142 pts</div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowMoreGroup2(!showMoreGroup2)}
              className="w-full text-center py-2 text-nba-primary hover:text-blue-700 text-sm font-medium"
            >
              {showMoreGroup2 ? 'Show Less' : 'Show More Members (1 more)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;