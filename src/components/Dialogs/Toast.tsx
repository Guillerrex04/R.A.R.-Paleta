import { useState } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  (window as any).showToast = addToast;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" aria-live="polite">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-in min-w-[280px] max-w-[400px] ${
            toast.type === 'success' ? 'bg-[var(--color-accent-success)]/90 text-white' :
            toast.type === 'error' ? 'bg-[var(--color-accent-highlight)]/90 text-white' :
            'bg-[var(--color-bg-panel)]/90 text-[var(--color-text-body)] border border-[var(--color-graphics-border)]'
          }`}
          role="alert"
        >
          {toast.type === 'success' && (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {toast.type === 'error' && (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {toast.type === 'info' && (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}