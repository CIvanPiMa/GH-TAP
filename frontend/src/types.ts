export interface Turn {
  id: number;
  player: string;
  action: string;
  initiative: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface HealthResponse {
  status: string;
  message?: string;
}

export type ApiStatus = "checking..." | "connected" | "disconnected";
