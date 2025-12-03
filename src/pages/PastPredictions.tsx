
import { useEffect, useState } from 'react';
import { fetchPastPredictions } from '../hooks/usePredictions';

export interface PredictionEntry {
  pid: number;
  user_id: number;
  group_id: number;
  fixture_id: number;
  pred_home_score: number;
  pred_away_score: number;
  prediction_time: string;
  points_earned: number;
  locked: boolean;
  home_team?: string;
  away_team?: string;
  actual_home_score?: number;
  actual_away_score?: number;
}

const PAGE_SIZE = 50;

const PastPredictions: React.FC = () => {
  const [predictions, setPredictions] = useState<PredictionEntry[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPredictions(page);
    // eslint-disable-next-line
  }, [page]);

  const loadPredictions = async (pageNum: number) => {
    setLoading(true);
    try {
      const result = await fetchPastPredictions(pageNum, PAGE_SIZE);
      setPredictions(prev => [...prev, ...result]);
      setHasMore(result.length === PAGE_SIZE);
    } catch (e) {
      // handle error
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Scoring Logic Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6 text-sm text-blue-900">
        <h2 className="font-semibold mb-2">How are prediction points calculated?</h2>
        <ul className="list-disc pl-5 mb-2">
          <li><strong>10 points</strong>: If you guess both the home and away scores exactly right.</li>
          <li><strong>3 points</strong>: If you correctly predict which team wins (or a tie).</li>
          <li><strong>+1 point</strong>: If your home score guess is within 2 points of the actual score.</li>
          <li><strong>+1 point</strong>: If your away score guess is within 2 points of the actual score.</li>
        </ul>
        <div>Maximum possible points for a single prediction: <strong>10</strong>. Otherwise, you can earn up to <strong>5</strong> points for a close and accurate guess.</div>
      </div>
      {predictions.length === 0 && !loading ? (
        <div>No past predictions found.</div>
      ) : (
        <table className="min-w-full mb-4">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4 text-left">Home Team</th>
              <th className="py-2 px-4 text-left">Away Team</th>
              <th className="py-2 px-4 text-left">Your Prediction</th>
              <th className="py-2 px-4 text-left">Actual Score</th>
              <th className="py-2 px-4 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map(pred => (
              <tr key={pred.pid} className="border-b">
                <td className="py-2 px-4">{pred.home_team || '-'}</td>
                <td className="py-2 px-4">{pred.away_team || '-'}</td>
                <td className="py-2 px-4">{pred.pred_home_score} - {pred.pred_away_score}</td>
                <td className="py-2 px-4">{typeof pred.actual_home_score === 'number' && typeof pred.actual_away_score === 'number' ? `${pred.actual_home_score} - ${pred.actual_away_score}` : '-'}</td>
                <td className="py-2 px-4">{pred.points_earned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {hasMore && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setPage(page + 1)}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default PastPredictions;
