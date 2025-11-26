import { useState } from 'react';
import { api, endpoints } from '../config/api';
import type { Group, GroupCreate, GroupJoin, GroupMember } from '../types';

export const useGroups = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a new group
  const createGroup = async (groupData: GroupCreate): Promise<Group> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post<Group>(endpoints.groups.create, groupData);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to create group';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Join a group by code
  const joinGroup = async (joinData: GroupJoin): Promise<Group> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post<Group>(endpoints.groups.join, joinData);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to join group';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get user's groups
  const getMyGroups = async (): Promise<Group[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get<Group[]>(endpoints.groups.myGroups);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to fetch groups';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get group details
  const getGroupDetails = async (groupId: number): Promise<Group> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get<Group>(endpoints.groups.details(groupId));
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to fetch group details';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get group members
  const getGroupMembers = async (groupId: number): Promise<GroupMember[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get<GroupMember[]>(endpoints.groups.members(groupId));
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to fetch group members';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Leave a group
  const leaveGroup = async (groupId: number): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await api.delete(endpoints.groups.leave(groupId));
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to leave group';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Delete a group
  const deleteGroup = async (groupId: number): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await api.delete(endpoints.groups.delete(groupId));
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to delete group';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createGroup,
    joinGroup,
    getMyGroups,
    getGroupDetails,
    getGroupMembers,
    leaveGroup,
    deleteGroup,
  };
};