
import React from 'react';
import { RouteResult } from '../types';
import { CLUSTER_COLORS } from '../constants';

interface ResultsDisplayProps {
    routes: RouteResult[];
    summary: string | null;
    isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ routes, summary, isLoading }) => {
    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-4">
                    <div className="h-20 bg-slate-200 rounded"></div>
                    <div className="h-20 bg-slate-200 rounded"></div>
                </div>
            </div>
        );
    }
    
    if (!summary || routes.length === 0) {
        return (
            <div className="text-center py-10 px-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0-6v6m0 6h6m-6-6h6m6-3l-5.447 2.724A1 1 0 0115 8.618v10.764a1 1 0 01-1.447.894L9 17" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-slate-900">Aguardando Otimização</h3>
                <p className="mt-1 text-sm text-slate-500">Adicione pontos no mapa e clique em "Otimizar Rotas".</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-slate-800">Resumo da Otimização</h3>
                <p className="mt-1 text-sm text-slate-600">{summary}</p>
            </div>
            <div className="space-y-4">
                {routes.map((route, index) => {
                     const color = CLUSTER_COLORS[route.clusterId % CLUSTER_COLORS.length];
                     return (
                        <div key={route.clusterId} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-md flex items-center" style={{ color }}>
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></span>
                                Rota do Entregador {index + 1}
                            </h4>
                            <p className="text-sm text-slate-600 mt-2 mb-3">{route.explanation}</p>
                            <ol className="list-decimal list-inside text-sm space-y-1 text-slate-700">
                                {route.ordered_path.map((p, i) => (
                                    <li key={i} className="capitalize">
                                        {p.id === 'depot' ? 'Depósito (Início/Fim)' : `Entrega #${p.id}`}
                                    </li>
                                ))}
                            </ol>
                        </div>
                     )
                })}
            </div>
        </div>
    );
};

export default ResultsDisplay;
