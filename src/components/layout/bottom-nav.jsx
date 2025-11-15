import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, User, Shield } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '@/hooks/use-auth';

const BottomNav = () => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
      show: true,
    },
    {
      name: 'Create',
      path: '/create',
      icon: PlusCircle,
      show: true,
    },
    {
      name: 'You',
      path: user ? '/profile' : '/login',
      icon: User,
      show: true,
    },
    {
      name: 'Admin',
      path: '/admin',
      icon: Shield,
      show: isAdmin,
    },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-dark-800 shadow-lg">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems
          .filter((item) => item.show)
          .map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                className={clsx(
                  'flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200',
                  active
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                <div
                  className={clsx(
                    'flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200',
                    active
                      ? 'bg-primary-100 dark:bg-primary-900/30 scale-110'
                      : 'hover:bg-gray-100 dark:hover:bg-dark-800'
                  )}
                >
                  <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                </div>
                <span
                  className={clsx(
                    'text-xs font-medium transition-all duration-200',
                    active ? 'font-semibold' : ''
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
      </div>
    </nav>
  );
};

export default BottomNav;
