import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addNotification = (message, type = 'success') => {
    const id = uuidv4();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const dismissNotification = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ toasts, addNotification, dismissNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
