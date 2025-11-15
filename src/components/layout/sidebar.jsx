import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  BarChart3,
  Flag,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Tools',
      path: '/admin/tools',
      icon: Package,
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: Users,
    },
    {
      name: 'Analytics',
      path: '/admin/analytics',
      icon: BarChart3,
    },
    {
      name: 'Reports',
      path: '/admin/reports',
      icon: Flag,
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: Settings,
    },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={clsx(
        'fixed left-0 top-16 bottom-0 bg-white dark:bg-dark-900 border-r border-gray-200 dark:border-dark-800 transition-all duration-300 z-30',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors shadow-md"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                active
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon
                size={20}
                strokeWidth={active ? 2.5 : 2}
                className="flex-shrink-0"
              />
              {!isCollapsed && (
                <span className={clsx('font-medium', active ? 'font-semibold' : '')}>
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Version Info */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4 p-4 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">
            Graphz Admin Panel
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Version 1.0.0
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
