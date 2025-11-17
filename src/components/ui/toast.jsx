import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';

const Toast = ({ id, type, message, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  };

  const bgColors = {
    success: 'bg-green-50 dark:bg-green-900/50',
    error: 'bg-red-50 dark:bg-red-900/50',
    warning: 'bg-yellow-50 dark:bg-yellow-900/50',
  };

  const textColors = {
    success: 'text-green-800 dark:text-green-200',
    error: 'text-red-800 dark:text-red-200',
    warning: 'text-yellow-800 dark:text-yellow-200',
  };

  return (
    <div
      className={`rounded-md p-4 shadow-lg ${bgColors[type]} ${textColors[type]} relative overflow-hidden`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={() => onDismiss(id)}
              className={`inline-flex rounded-md p-1.5 ${textColors[type]} hover:bg-opacity-20 focus:outline-none`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-opacity-30 w-full animate-progress"></div>
    </div>
  );
};

const ToastContainer = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 w-80">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
