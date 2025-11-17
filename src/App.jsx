import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import { ThemeProvider } from './contexts/theme-context';
import { NotificationProvider } from './contexts/notification-context';
import Header from './components/layout/header';
import BottomNav from './components/layout/bottom-nav';
import Home from './pages/home';
import Create from './pages/create';
import Profile from './pages/profile';
import Admin from './pages/admin';
import NotFound from './pages/404';
import ToastContainer from './components/ui/toast';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
              <Header />
              <main className="pb-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin/*" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <BottomNav />
              <ToastContainer />
            </div>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
