
import React, { useState, useCallback } from 'react';
import { Point, RouteResult, OptimizationResponse, ClusterResult } from './types';
import { DEPOT_COORDS } from './constants';
import MapDisplay from './components/MapDisplay';
import Controls from './components/Controls';
import ResultsDisplay from './components/ResultsDisplay';
import { getOptimizedRoute } from './services/geminiService';

const App: React.FC = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const [clusters, setClusters] = useState<ClusterResult[]>([]);
    const [routes, setRoutes] = useState<RouteResult[]>([]);
    const [summary, setSummary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleMapClick = (event: React.MouseEvent<SVGSVGElement>) => {
        if (isLoading) return;
        const svg = event.currentTarget;
        const pt = svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        const { x, y } = pt.matrixTransform(svg.getScreenCTM()?.inverse());

        const newPoint: Point = {
            id: points.length + 1,
            x: Math.round(x),
            y: Math.round(y),
        };
        setPoints(prevPoints => [...prevPoints, newPoint]);
    };

    const handleOptimize = useCallback(async () => {
        if (points.length === 0) {
            setError("Adicione pelo menos um ponto de entrega antes de otimizar.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setRoutes([]);
        setClusters([]);
        setSummary(null);

        try {
            const result: OptimizationResponse = await getOptimizedRoute(points, DEPOT_COORDS);
            setClusters(result.clusters);
            setRoutes(result.routes);
            setSummary(result.overall_summary);
        } catch (err: any) {
            setError(err.message || "Ocorreu um erro desconhecido.");
        } finally {
            setIsLoading(false);
        }
    }, [points]);

    const handleClear = () => {
        if (isLoading) return;
        setPoints([]);
        setRoutes([]);
        setClusters([]);
        setSummary(null);
        setError(null);
    };

    return (
        <div className="bg-slate-100 min-h-screen font-sans text-slate-800">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl font-bold text-slate-900">Sabor Express: Rota Inteligente</h1>
                    <p className="text-sm text-slate-600">Otimizador de Entregas com IA</p>
                </div>
            </header>
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                 {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                        <strong className="font-bold">Erro: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <MapDisplay points={points} routes={routes} clusters={clusters} onMapClick={handleMapClick} />
                        <p className="text-center text-sm text-slate-500 mt-2">Clique no mapa para adicionar pontos de entrega.</p>
                    </div>
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg border border-slate-200 h-fit">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-slate-900">Painel de Controle</h2>
                            <p className="text-sm text-slate-500">Gerencie e otimize as rotas de entrega.</p>
                        </div>
                        <Controls onOptimize={handleOptimize} onClear={handleClear} isLoading={isLoading} hasPoints={points.length > 0} />
                        <hr className="my-6" />
                        <ResultsDisplay routes={routes} summary={summary} isLoading={isLoading} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
