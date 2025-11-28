
import { useEffect, useState } from 'react';
import { useGroups } from '../hooks/useGroups';
import { useLeaderboard } from '../hooks/useLeaderboard';

export interface LeaderboardEntry {
  user_id: number;
  username: string;
  email: string;
  total_points: number;
  rank_position?: number;
  last_updated: string;
  total_predictions: number;
  scored_predictions: number;
  exact_predictions: number;
  avg_points_per_prediction?: number;
}

const Leaderboard: React.FC = () => {
  const { loading: groupsLoading, error: groupsError, getMyGroups } = useGroups();
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const { loading, error, data, fetchLeaderboard } = useLeaderboard();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const myGroups = await getMyGroups();
        setGroups(myGroups);
        if (myGroups.length > 0) {
          setSelectedGroup(myGroups[0].group_id);
        }
      } catch (e) {
        // error handled in hook
      }
    };
    fetchGroups();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchLeaderboard(selectedGroup);
    }
    // eslint-disable-next-line
  }, [selectedGroup]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">🏆 Group Leaderboards</h1>

      {/* Group Selector */}
      <div className="mb-6">
        <label htmlFor="group-select" className="block mb-2 font-medium">Select Group:</label>
        <select
          id="group-select"
          className="border rounded px-3 py-2 w-full"
          value={selectedGroup ?? ''}
          onChange={e => setSelectedGroup(Number(e.target.value))}
          disabled={groupsLoading}
        >
          {groups.map(group => (
            <option key={group.group_id} value={group.group_id}>
              {group.group_name}
            </option>
          ))}
        </select>
        {groupsError && <div className="text-red-500 mt-2">{groupsError}</div>}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded shadow p-4">
        {loading ? (
          <div>Loading leaderboard...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : !data || data.length === 0 ? (
          <div>No leaderboard data available for this group.</div>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Rank</th>
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry: LeaderboardEntry, idx: number) => (
                <tr key={entry.user_id} className={idx < 3 ? 'font-bold bg-yellow-50' : ''}>
                  <td className="py-2 px-4">{entry.rank_position ?? idx + 1}</td>
                  <td className="py-2 px-4">{entry.username}</td>
                  <td className="py-2 px-4">{entry.total_points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;