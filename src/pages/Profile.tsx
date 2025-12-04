import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";

export default function Profile() {
  const { profile, stats, loading, error, message, fetchProfile, fetchStats, updateBio } = useProfile();
  const [bio, setBio] = useState("");

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  useEffect(() => {
    if (profile) setBio(profile.bio || "");
  }, [profile]);

  const handleBioUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBio(bio);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {profile && (
        <div className="mb-6">
          <div className="mb-2"><span className="font-semibold">Username:</span> {profile.username}</div>
          <form onSubmit={handleBioUpdate} className="flex flex-col gap-2">
            <label className="font-semibold">Bio:</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="border rounded p-2" />
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
              {loading ? "Updating..." : "Update Bio"}
            </button>
            {message && <div className="text-green-600 mt-2">{message}</div>}
          </form>
        </div>
      )}
      {stats && (
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Stats</h3>
          <div>Total Predictions: {stats.total_predictions}</div>
          <div>Correct Predictions: {stats.correct_predictions}</div>
          <div>Exact Score Predictions: {stats.exact_score_predictions}</div>
        </div>
      )}
    </div>
  );
}
