
import React, { useEffect, useState } from 'react';
import { api } from '../config/api';

export interface Team {
  team_id: number;
  team_name: string;
  city: string;
  abbreviation: string;
}

const Home: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await api.get<Team[]>('/fixtures/allteams');
        setTeams(res.data);
      } catch (err) {
        setError('Failed to load teams');
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

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
        </div>
      </section>

      {/* NBA Teams Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center">All NBA Teams</h2>
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading teams...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teams.map((team) => (
              <div
                key={team.team_id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-2xl font-bold mb-1">{team.abbreviation}</div>
                <div className="text-lg font-semibold">{team.team_name}</div>
                <div className="text-gray-500 text-sm">{team.city}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;