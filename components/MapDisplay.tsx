
import React from 'react';
import { Point, RouteResult, ClusterResult } from '../types';
import { MAP_WIDTH, MAP_HEIGHT, GRID_SIZE, DEPOT_COORDS, CLUSTER_COLORS } from '../constants';
import { DepotIcon, PinIcon } from './icons';

interface MapDisplayProps {
  points: Point[];
  routes: RouteResult[];
  clusters: ClusterResult[];
  onMapClick: (event: React.MouseEvent<SVGSVGElement>) => void;
}

const GridLines: React.FC = () => {
    const lines = [];
    for (let i = GRID_SIZE; i < MAP_WIDTH; i += GRID_SIZE) {
        lines.push(<line key={`v${i}`} x1={i} y1="0" x2={i} y2={MAP_HEIGHT} stroke="#e2e8f0" strokeWidth="0.5" />);
    }
    for (let i = GRID_SIZE; i < MAP_HEIGHT; i += GRID_SIZE) {
        lines.push(<line key={`h${i}`} x1="0" y1={i} x2={MAP_WIDTH} y2={i} stroke="#e2e8f0" strokeWidth="0.5" />);
    }
    return <g>{lines}</g>;
};

const RoutePath: React.FC<{ route: RouteResult; color: string }> = ({ route, color }) => {
    const pathData = "M" + route.ordered_path.map(p => `${p.x},${p.y}`).join(" L ");
    return (
        <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'd 0.5s ease-in-out' }}
        />
    );
};

const MapDisplay: React.FC<MapDisplayProps> = ({ points, routes, clusters, onMapClick }) => {
    const getPointColor = (pointId: number): string => {
        const cluster = clusters.find(c => c.points.some(p => p.id === pointId));
        if (cluster) {
            return CLUSTER_COLORS[cluster.clusterId % CLUSTER_COLORS.length];
        }
        return '#64748b'; // Default color for unclustered points
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
            <svg
                width="100%"
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                onClick={onMapClick}
                className="cursor-crosshair"
            >
                <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#f8fafc" />
                <GridLines />

                {routes.map((route) => (
                    <RoutePath key={route.clusterId} route={route} color={CLUSTER_COLORS[route.clusterId % CLUSTER_COLORS.length]} />
                ))}

                <DepotIcon x={DEPOT_COORDS.x} y={DEPOT_COORDS.y} />

                {points.map((point) => (
                     <PinIcon key={point.id} x={point.x} y={point.y} color={getPointColor(point.id)} />
                ))}
            </svg>
        </div>
    );
};

export default MapDisplay;
