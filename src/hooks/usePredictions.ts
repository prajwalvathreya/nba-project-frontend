import { useState } from 'react';
import { api, endpoints } from '../config/api';

// Define types based on your actual API structure
interface Fixture {
  match_num: number;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  completed: boolean;
  start_time: string;
  game_date: string;
  game_time: string;
}

interface Prediction {
  prediction_id?: number;
  user_id: number;
  group_id: number;
  fixture_id: number;
  pred_home_score: number;
  pred_away_score: number;
  points_earned?: number | null;
  created_at?: string;
  updated_at?: string;
  // Fixture details (likely joined in response)
  home_team?: string;
  away_team?: string;
  game_date?: string;
  start_time?: string;
}

interface PredictionCreate {
  group_id: number;
  fixture_id: number;
  pred_home_score: number;
  pred_away_score: number;
}

export const usePredictions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get upcoming fixtures
  const getUpcomingFixtures = async (): Promise<Fixture[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get<Fixture[]>(endpoints.fixtures.upcoming);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to fetch fixtures';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get next fixtures  
  const getNextFixtures = async (): Promise<Fixture[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get<Fixture[]>(endpoints.fixtures.next);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to fetch fixtures';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get my predictions
  const getMyPredictions = async (groupId?: number): Promise<Prediction[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const url = groupId 
        ? `${endpoints.predictions.myPredictions}?group_id=${groupId}`
        : endpoints.predictions.myPredictions;
      
      const response = await api.get<Prediction[]>(url);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to fetch predictions';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create a prediction
  const createPrediction = async (predictionData: PredictionCreate): Promise<Prediction> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post<Prediction>(endpoints.predictions.create, predictionData);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to create prediction';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Update a prediction
  const updatePrediction = async (predictionData: PredictionCreate): Promise<Prediction> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.put<Prediction>(endpoints.predictions.update, predictionData);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to update prediction';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getUpcomingFixtures,
    getNextFixtures,
    getMyPredictions,
    createPrediction,
    updatePrediction,
  };
};