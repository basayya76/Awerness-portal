import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Nyaya Sahaya portal:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl mb-4 border border-amber-500/30">
            ⚖
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Nyaya Sahaya Portal</h1>
          <p className="text-slate-400 max-w-md text-sm mb-6">
            An error occurred while loading this page. Please try refreshing or clearing cached portal data.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-rose-400 font-mono max-w-lg overflow-auto mb-6 text-left">
            {this.state.error?.message || 'Unknown runtime error'}
          </div>
          <button
            onClick={() => {
              window.localStorage.removeItem('nyaya_sahaya_user_lang');
              window.location.reload();
            }}
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors"
          >
            Refresh & Reset Session
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
