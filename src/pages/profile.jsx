import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Package, LogOut, Edit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Button from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { formatDate, getInitials } from '@/utils/helpers';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-3xl font-bold">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                getInitials(user.displayName || user.email)
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {user.displayName || 'Anonymous User'}
              </h1>
              <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  {user.email}
                </div>
                {user.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    Member since {formatDate(user.createdAt)}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" icon={<Edit size={16} />}>
                Edit Profile
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<LogOut size={16} />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
              {user.submissions?.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Submissions</div>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
              {user.favorites?.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Favorites</div>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
              {user.role === 'admin' ? 'Admin' : 'User'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Role</div>
          </Card>
        </div>

        {/* Submitted Tools */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Package className="text-primary-600 dark:text-primary-400" size={24} />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Your Submissions
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tools you've submitted to Graphz
              </p>
            </div>
          </div>

          {user.submissions && user.submissions.length > 0 ? (
            <div className="space-y-4">
              {/* TODO: List submitted tools */}
              <p className="text-gray-600 dark:text-gray-400">
                Your submitted tools will appear here.
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No submissions yet
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Start by submitting your first AI tool!
              </p>
              <Button variant="primary" onClick={() => navigate('/create')}>
                Submit a Tool
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
