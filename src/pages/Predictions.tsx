import React, { useState, useEffect } from 'react';
import { usePredictions } from '../hooks/usePredictions';
import { useGroups } from '../hooks/useGroups';
import { useAuth } from '../context/AuthContext';

// Local types to match your API
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

interface Group {
  group_id: number;
  group_name: string;
  group_code: string;
  creator_id: number;
  creator_username?: string;
  creation_date: string;
  member_count?: number;
  is_creator?: boolean;
  joined_date?: string;
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
  home_team?: string;
  away_team?: string;
  game_date?: string;
  start_time?: string;
}

const Predictions: React.FC = () => {
  const { user } = useAuth();
  const {
    loading: predictionsLoading,
    error: predictionsError,
    getNextFixtures,
    getMyPredictions,
    createPrediction,
    updatePrediction,
  } = usePredictions();
  
  const {
    loading: groupsLoading,
    error: groupsError,
    getMyGroups,
  } = useGroups();

  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load fixtures and groups in parallel
      const [nextFixtures, userGroups] = await Promise.all([
        getNextFixtures(),
        getMyGroups()
      ]);
      setFixtures(nextFixtures);
      setGroups(userGroups);

      // Load all predictions (across all groups)
      if (userGroups.length > 0) {
        await loadAllPredictions();
      }
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  const loadAllPredictions = async () => {
    try {
      // Get predictions for all groups and combine (remove duplicates by fixture)
      const allPredictions = await getMyPredictions(); // No group filter = all groups
      setPredictions(allPredictions);
    } catch (err) {
      console.error('Failed to load predictions:', err);
    }
  };

  const handleMakePrediction = async (
    fixtureId: number,
    homeScore: number,
    awayScore: number
  ) => {
    if (groups.length === 0) {
      alert('You must be in at least one group to make predictions');
      return;
    }

    try {
      // Create the same prediction for ALL groups the user is in
      const predictionPromises = groups.map(group => 
        createPrediction({
          group_id: group.group_id,
          fixture_id: fixtureId,
          pred_home_score: homeScore,
          pred_away_score: awayScore,
        })
      );

      const newPredictions = await Promise.all(predictionPromises);
      
      // Add new predictions to state
      setPredictions([...predictions, ...newPredictions]);
      
    } catch (err) {
      console.error('Failed to create predictions:', err);
    }
  };

  const handleUpdatePrediction = async (
    fixtureId: number,
    homeScore: number,
    awayScore: number
  ) => {
    if (groups.length === 0) {
      alert('You must be in at least one group to update predictions');
      return;
    }

    try {
      // Update the prediction for ALL groups the user is in
      const updatePromises = groups.map(group => 
        updatePrediction({
          group_id: group.group_id,
          fixture_id: fixtureId,
          pred_home_score: homeScore,
          pred_away_score: awayScore,
        })
      );

      const updatedPredictions = await Promise.all(updatePromises);
      
      // Update predictions in state
      setPredictions(predictions.map(p => {
        const updated = updatedPredictions.find(up => up.group_id === p.group_id && up.fixture_id === p.fixture_id);
        return updated || p;
      }));
      
    } catch (err) {
      console.error('Failed to update predictions:', err);
    }
  };

  const formatDateTime = (startTime: string) => {
    const date = new Date(startTime);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getPredictionForFixture = (matchNum: number) => {
    // Return first prediction found (since all groups have same prediction)
    return predictions.find(p => p.fixture_id === matchNum);
  };

  const getUniqueRecentPredictions = () => {
    // Get unique predictions by fixture_id (since same prediction exists across groups)
    const uniquePredictions = predictions.reduce((acc, prediction) => {
      if (!acc.find(p => p.fixture_id === prediction.fixture_id)) {
        acc.push(prediction);
      }
      return acc;
    }, [] as Prediction[]);
    
    return uniquePredictions.slice(0, 5);
  };

  if (!groups.length && !groupsLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="card text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No Groups Found</h2>
          <p className="text-gray-600 mb-6">
            You need to join or create a group before making predictions.
          </p>
          <a href="/groups" className="btn-primary">
            Go to Groups
          </a>
        </div>
      </div>
    );
  }

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

      {/* Groups Info */}
      {groups.length > 0 && (
        <div className="card mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Your predictions will be automatically applied to all groups you are a member of.</h2>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {(predictionsError || groupsError) && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
          {predictionsError || groupsError}
        </div>
      )}

      {/* Upcoming Games */}
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Upcoming Games</h2>
          
          {(predictionsLoading || groupsLoading) && fixtures.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nba-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading games...</p>
            </div>
          ) : fixtures.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No upcoming games found.</p>
            </div>
          ) : (
            <div className="space-y-4">
                {fixtures.map((fixture) => {
                  const existingPrediction = getPredictionForFixture(fixture.match_num);
                  return (
                    <div key={fixture.match_num} className="card mb-2 p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-lg">{fixture.home_team} vs {fixture.away_team}</div>
                          <div className="text-sm text-gray-600">{formatDateTime(fixture.start_time)}</div>
                        </div>
                        <div>
                          <PredictionCard
                            fixture={fixture}
                            existingPrediction={existingPrediction}
                            onMakePrediction={handleMakePrediction}
                            onUpdatePrediction={handleUpdatePrediction}
                            loading={predictionsLoading}
                            formatDateTime={formatDateTime}
                            groupCount={groups.length}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* My Recent Predictions */}
        {predictions.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">My Recent Predictions</h2>
            <div className="space-y-3">
              {getUniqueRecentPredictions().map((prediction, index) => (
                <div key={`${prediction.fixture_id}-${index}`} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <div className="space-y-1">
                    <div className="font-medium">
                      {prediction.home_team} vs {prediction.away_team}
                    </div>
                    <div className="text-sm text-gray-600">
                      Predicted: {prediction.pred_home_score} - {prediction.pred_away_score}
                    </div>
                    <div className="text-xs text-gray-500">
                      Applied to {groups.length} group{groups.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="text-right">
                    {prediction.points_earned !== null && prediction.points_earned !== undefined ? (
                      <div className="text-green-600 font-semibold">
                        +{prediction.points_earned} points
                      </div>
                    ) : (
                      <div className="text-gray-500">Pending</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Separate component for each prediction card
const PredictionCard: React.FC<{
  fixture: Fixture;
  existingPrediction?: Prediction;
  onMakePrediction: (fixtureId: number, homeScore: number, awayScore: number) => void;
  onUpdatePrediction: (fixtureId: number, homeScore: number, awayScore: number) => void;
  loading: boolean;
  formatDateTime: (startTime: string) => string;
  groupCount: number;
}> = ({ fixture, existingPrediction, onMakePrediction, onUpdatePrediction, loading, formatDateTime, groupCount }) => {
  const [homeScore, setHomeScore] = useState(
    fixture.home_score !== null ? fixture.home_score.toString() : ''
  );
  const [awayScore, setAwayScore] = useState(
    fixture.away_score !== null ? fixture.away_score.toString() : ''
  );
  // Remove isEditing state, not needed for direct update

  // Sync score fields with fixture scores when they change
  React.useEffect(() => {
    setHomeScore(fixture.home_score !== null ? fixture.home_score.toString() : '');
    setAwayScore(fixture.away_score !== null ? fixture.away_score.toString() : '');
  }, [fixture.home_score, fixture.away_score]);

  // Check if game has started (disable updates after start time)
  const gameStarted = new Date(fixture.start_time) <= new Date();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const home = parseInt(homeScore);
    const away = parseInt(awayScore);
    if (isNaN(home) || isNaN(away) || home < 0 || away < 0) {
      alert('Please enter valid scores');
      return;
    }
    // If scores are populated, always call update
    if (fixture.home_score !== null && fixture.away_score !== null) {
      onUpdatePrediction(fixture.match_num, home, away);
    } else {
      onMakePrediction(fixture.match_num, home, away);
    }
  };

  // Remove handleCancelEdit, not needed

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="font-semibold">{fixture.away_team}</div>
            <div className="text-sm text-gray-600">Away</div>
          </div>
          <span className="text-gray-400">@</span>
          <div className="text-center">
            <div className="font-semibold">{fixture.home_team}</div>
            <div className="text-sm text-gray-600">Home</div>
          </div>
        </div>
        <div className="text-sm text-gray-600 text-right">
          <div>{formatDateTime(fixture.start_time)}</div>
          {gameStarted && (
            <div className="text-red-600 font-medium">Game Started</div>
          )}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">
            {fixture.away_team} Score
          </label>
          <input 
            type="number" 
            className="input-field" 
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            placeholder="0" 
            min="0" 
            max="200"
            required
            disabled={loading || gameStarted}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            {fixture.home_team} Score
          </label>
          <input 
            type="number" 
            className="input-field" 
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            placeholder="0" 
            min="0" 
            max="200"
            required
            disabled={loading || gameStarted}
          />
        </div>
        <div>
          {gameStarted ? (
            <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded text-sm">
              🔒 Predictions locked
            </div>
          ) : (fixture.home_score !== null && fixture.away_score !== null) ? (
            <button
              type="submit"
              disabled={loading}
              className="btn-secondary w-full text-sm"
            >
              {loading ? 'Updating...' : 'Update Prediction'}
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'Submitting...' : `Submit Prediction`}
            </button>
          )}
        </div>
      </form>
      
      <div className="mt-4 text-sm text-gray-600">
        Winner determined automatically • 
        {gameStarted 
          ? ' Predictions are locked after game start'
          : existingPrediction 
            ? ' You can update your prediction until the game starts'
            : ' Prediction saved'
        }
      </div>
    </div>
  );
};

export default Predictions;