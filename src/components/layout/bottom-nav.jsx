import React from 'react';
import { Home, Plus, User, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/auth-context';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/create', icon: Plus, label: 'Create' },
    { to: '/profile', icon: User, label: 'You' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ to: '/admin', icon: Shield, label: 'Admin' });
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center justify-center h-full w-full ${
              location.pathname === item.to
                ? 'text-saffron'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
