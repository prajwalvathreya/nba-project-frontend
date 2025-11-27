import { useState } from 'react';
import { api } from '../config/api';

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

export const useLeaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LeaderboardEntry[] | null>(null);

  const fetchLeaderboard = async (groupId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/leaderboard/${groupId}`);
      setData(res.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, fetchLeaderboard };
};
