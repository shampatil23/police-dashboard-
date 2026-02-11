
export interface Contact {
  name: string;
  phone: string;
  relationship: string;
}

export interface HistoryItem {
  id?: string;
  emotion: string;
  latitude: number;
  longitude: number;
  status: string;
  timestamp: number;
  audioUrl?: string;
}

export interface User {
  id?: string;
  name?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  role?: 'admin' | 'member' | 'police';
  batteryLevel?: number;
  dangerZoneActive?: boolean;
  lastLatitude?: number;
  lastLongitude?: number;
  lastUpdateTimestamp?: number;
  uniqueId?: string;
  station?: string;
  contacts?: Record<string, Contact>;
  history?: Record<string, HistoryItem>;
  lastLogin?: number;
}

export interface Alert {
  id?: string;
  confidence: number;
  emotion: string;
  latitude: number;
  longitude: number;
  locationName: string;
  phone: string;
  status: string;
  threatLevel: 'High' | 'Medium' | 'Low';
  timestamp: number;
  userName: string;
}

export interface DashboardData {
  alerts: Record<string, Alert>;
  users: Record<string, User>;
}