import { useState } from 'react';
import { api } from '../config/api';

export interface UserProfile {
  username: string;
  bio?: string;
}

export interface UserStats {
  total_predictions: number;
  correct_predictions: number;
  exact_score_predictions: number;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/user/me/profile');
      setProfile(res.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/user/me/stats');
      setStats(res.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const updateBio = async (bio: string) => {
    setLoading(true);
    setError(null);
    setMessage("");
    try {
      await api.put('/user/me/profile', { bio });
      setMessage('Bio updated successfully!');
      setProfile(prev => prev ? { ...prev, bio } : prev);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update bio');
    } finally {
      setLoading(false);
    }
  };

  return { profile, stats, loading, error, message, fetchProfile, fetchStats, updateBio };
};
