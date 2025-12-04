// User types
export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  is_active: boolean;
}

// NBA Team type
export interface Team {
  team_id: number;
  team_name: string;
  city: string;
  abbreviation: string;
}

// Registration data
export interface UserRegister {
  username: string;
  email: string;
  password: string;
}

// Login data
export interface UserLogin {
  username: string;
  password: string;
}

// Auth response from login endpoint
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// API Error response
export interface ApiError {
  detail: string;
}

// Token validation response
export interface TokenValidationResponse {
  valid: boolean;
  user?: User;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Group types
export interface Group {
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

// Create group request
export interface GroupCreate {
  group_name: string;
}

// Join group request
export interface GroupJoin {
  group_code: string;
}

// Group member info
export interface GroupMember {
  user_id: number;
  username: string;
  joined_date: string;
  is_creator: boolean;
  total_points?: number;
  total_predictions?: number;
  correct_predictions?: number;
}
