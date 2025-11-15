import { Toaster as HotToaster, toast as hotToast } from 'react-hot-toast';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';

export const Toaster = () => {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-color)',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid var(--toast-border)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: 'white',
          },
        },
      }}
    />
  );
};

const createToast = (message, type) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  return hotToast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-slide-up' : 'animate-slide-down'
        } max-w-md w-full bg-white dark:bg-dark-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 dark:ring-dark-700`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">{icons[type]}</div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-dark-700">
          <button
            onClick={() => hotToast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
          >
            Close
          </button>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-dark-700 overflow-hidden rounded-b-lg">
          <div
            className="h-full bg-primary-500 transition-all duration-[5000ms] ease-linear"
            style={{
              width: t.visible ? '0%' : '100%',
              transition: t.visible ? 'width 5000ms linear' : 'none'
            }}
          />
        </div>
      </div>
    ),
    { duration: 5000 }
  );
};

export const toast = {
  success: (message) => createToast(message, 'success'),
  error: (message) => createToast(message, 'error'),
  warning: (message) => createToast(message, 'warning'),
  info: (message) => createToast(message, 'info'),
  promise: (promise, messages) => hotToast.promise(promise, messages),
  dismiss: (toastId) => hotToast.dismiss(toastId),
};

export default toast;
