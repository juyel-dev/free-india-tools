import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/auth-context';
import { useTools } from '../hooks/use-tools';
import Card from '../components/ui/card';
import Button from '../components/ui/button';
import Skeleton from '../components/ui/skeleton';
import {
  User,
  Mail,
  Globe,
  Settings,
  Star,
  Eye,
  Award,
  Heart,
  Edit,
  Trash2,
  LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const { userTools, favoriteTools, loading } = useTools();
  const [activeTab, setActiveTab] = useState('submissions');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const stats = [
    { label: 'Tools Submitted', value: userTools.length, icon: Settings },
    {
      label: 'Average Rating',
      value: userTools.length
        ? (
            userTools.reduce((sum, tool) => sum + (tool.rating || 0), 0) /
            userTools.length
          ).toFixed(1)
        : '0.0',
      icon: Star,
    },
    {
      label: 'Total Clicks',
      value: userTools.reduce((sum, tool) => sum + (tool.clicks || 0), 0),
      icon: Eye,
    },
    { label: 'Favorites', value: favoriteTools.length, icon: Heart },
  ];

  const tabOptions = [
    { id: 'submissions', label: 'My Submissions' },
    { id: 'favorites', label: 'My Favorites' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Your Profile
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card padding="lg" className="text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-saffron/10 flex items-center justify-center mb-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-saffron" />
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {user.displayName || 'User'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>

              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-saffron hover:underline"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {new URL(user.website).hostname}
                </a>
              )}

              <div className="mt-4 w-full">
                <Button
                  variant="outline"
                  className="w-full mb-2"
                  onClick={() => setActiveTab('settings')}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                STATS
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"
                  >
                    <div className="flex items-center">
                      <stat.icon className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card padding="md">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {tabOptions.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'border-b-2 border-saffron text-saffron'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-4">
              {activeTab === 'submissions' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    My Submissions ({userTools.length})
                  </h2>

                  {loading ? (
                    <div className="space-y-4">
                      <Skeleton type="card" />
                      <Skeleton type="card" />
                    </div>
                  ) : userTools.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                      You haven't submitted any tools yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {userTools.map((tool) => (
                        <div
                          key={tool.id}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                              {tool.name}
                            </h3>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                              <span className="text-sm">
                                {tool.rating?.toFixed(1) || '0.0'}
                              </span>
                              <span className="text-gray-400 mx-2">•</span>
                              <Eye className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm">
                                {tool.clicks || 0} clicks
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                tool.status === 'approved'
                                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                  : tool.status === 'pending'
                                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                              }`}
                            >
                              {tool.status}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={Edit}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              icon={Trash2}
                              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    My Favorites ({favoriteTools.length})
                  </h2>

                  {loading ? (
                    <div className="space-y-4">
                      <Skeleton type="card" />
                      <Skeleton type="card" />
                    </div>
                  ) : favoriteTools.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                      You haven't favorited any tools yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {favoriteTools.map((tool) => (
                        <div
                          key={tool.id}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {tool.description}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={Heart}
                              className="text-red-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Account Settings
                  </h2>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={user.displayName || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-saffron focus:border-saffron"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        value={user.website || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-saffron focus:border-saffron"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bio
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-saffron focus:border-saffron"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="pt-4">
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
