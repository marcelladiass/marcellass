
export interface Point {
  id: number;
  x: number;
  y: number;
}

export interface PathPoint {
  id: string; // Can be a number string or 'depot'
  x: number;
  y: number;
}

export interface ClusterResult {
  clusterId: number;
  points: Point[];
}

export interface RouteResult {
  clusterId: number;
  ordered_path: PathPoint[];
  explanation: string;
}

export interface OptimizationResponse {
  clusters: ClusterResult[];
  routes: RouteResult[];
  overall_summary: string;
}
