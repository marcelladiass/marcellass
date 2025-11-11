
import React from 'react';
import { LoadingSpinner } from './icons';

interface ControlsProps {
  onOptimize: () => void;
  onClear: () => void;
  isLoading: boolean;
  hasPoints: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onOptimize, onClear, isLoading, hasPoints }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={onOptimize}
        disabled={isLoading || !hasPoints}
        className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading && <LoadingSpinner />}
        {isLoading ? 'Otimizando...' : 'Otimizar Rotas'}
      </button>
      <button
        onClick={onClear}
        disabled={isLoading}
        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Limpar Pontos
      </button>
    </div>
  );
};

export default Controls;
