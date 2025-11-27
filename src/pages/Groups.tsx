import React, { useState, useEffect } from 'react';
import { useGroups } from '../hooks/useGroups';
import { useAuth } from '../context/AuthContext';

// Define Group type locally
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

const Groups: React.FC = () => {
  const { user } = useAuth();
  const {
    loading,
    error,
    createGroup,
    joinGroup,
    getMyGroups,
    leaveGroup,
    deleteGroup,
  } = useGroups();

  const [groups, setGroups] = useState<Group[]>([]);
  
  // Form states
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');

  // Load user's groups on component mount
  useEffect(() => {
    loadMyGroups();
  }, []);

  const loadMyGroups = async () => {
    try {
      const userGroups = await getMyGroups();
      setGroups(userGroups);
    } catch (err) {
      console.error('Failed to load groups:', err);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newGroup = await createGroup({ group_name: groupName });
      setGroups([...groups, newGroup]);
      setGroupName('');
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const joinedGroup = await joinGroup({ group_code: groupCode.toUpperCase() });
      setGroups([...groups, joinedGroup]);
      setGroupCode('');
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleLeaveGroup = async (groupId: number) => {
    if (!window.confirm('Are you sure you want to leave this group?')) {
      return;
    }

    try {
      await leaveGroup(groupId);
      setGroups(groups.filter(g => g.group_id !== groupId));
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleDeleteGroup = async (groupId: number) => {
    if (!window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteGroup(groupId);
      setGroups(groups.filter(g => g.group_id !== groupId));
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
        </h1>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6 mb-8">
        {/* My Groups Section - Groups I'm a member of */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">My Groups</h2>
          
          {loading && groups.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nba-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your groups...</p>
            </div>
          ) : groups.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">You haven't joined any groups yet.</p>
              <p className="text-sm">Create a group or join one using a group code below.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map((group) => (
                <div key={group.group_id} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-lg">{group.group_name}</h3>
                    {group.is_creator && (
                      <span className="bg-nba-primary text-white text-xs px-2 py-1 rounded">
                        ADMIN
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span>Group Code:</span>
                      <span className="bg-gray-200 px-2 py-1 rounded font-mono text-xs">
                        {group.group_code}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Members:</span>
                      <span>{group.member_count || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Created:</span>
                      <span>{new Date(group.creation_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button className="btn-primary text-sm px-3 py-1 w-full">
                      View Leaderboard
                    </button>
                    
                    {group.is_creator ? (
                      <button
                        onClick={() => handleDeleteGroup(group.group_id)}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded w-full transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Deleting...' : 'Delete Group'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleLeaveGroup(group.group_id)}
                        disabled={loading}
                        className="btn-secondary text-sm px-3 py-1 w-full"
                      >
                        {loading ? 'Leaving...' : 'Leave Group'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Join Group Section */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Join a Group</h2>
          <p className="text-gray-600 mb-4">
            Ask a group admin for the 6-character group code to join their prediction group.
          </p>
          <form onSubmit={handleJoinGroup} className="flex gap-4 max-w-md">
            <input
              type="text"
              className="input-field flex-1"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
              placeholder="Enter group code (e.g., ABC123)"
              maxLength={6}
              disabled={loading}
              required
            />
            <button 
              type="submit" 
              className="btn-primary disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Joining...' : 'Join Group'}
            </button>
          </form>
        </div>

        {/* Create Group Section */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Create a Group</h2>
          <form onSubmit={handleCreateGroup} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group Name
              </label>
              <input
                type="text"
                className="input-field"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g., Work Squad, Family League"
                required
                minLength={3}
                maxLength={100}
                disabled={loading}
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Group'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Groups;