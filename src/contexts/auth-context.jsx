import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/use-auth';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Re-export useAuth from hooks (এটাই সমস্যা সমাধান করবে)
export { useAuth };

// Optional: Custom hook for context (যদি অন্য কোথাও দরকার হয়)
export function useAuthContext() {
  return useContext(AuthContext);
}
