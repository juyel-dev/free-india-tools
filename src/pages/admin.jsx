import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Users, BarChart3, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Sidebar from '@/components/layout/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { useTools } from '@/hooks/use-tools';
import { formatNumber, timeAgo } from '@/utils/helpers';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { tools, fetchPendingTools, approveTool, rejectTool } = useTools();
  const [pendingTools, setPendingTools] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  // Fetch pending tools
  useEffect(() => {
    const loadPendingTools = async () => {
      setLoading(true);
      const pending = await fetchPendingTools();
      setPendingTools(pending);
      setLoading(false);
    };

    if (isAdmin) {
      loadPendingTools();
    }
  }, [isAdmin]);

  const handleApprove = async (toolId) => {
    await approveTool(toolId);
    setPendingTools(pendingTools.filter((tool) => tool.id !== toolId));
  };

  const handleReject = async (toolId) => {
    await rejectTool(toolId);
    setPendingTools(pendingTools.filter((tool) => tool.id !== toolId));
  };

  if (!isAdmin) {
    return null;
  }

  const stats = {
    totalTools: tools.length,
    pendingReviews: pendingTools.length,
    totalUsers: 0, // TODO: Fetch from Firestore
    totalViews: tools.reduce((sum, tool) => sum + (tool.clicks || 0), 0),
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-950">
      <Sidebar />

      <div className="flex-1 ml-0 md:ml-64 pt-16">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage tools, users, and monitor platform activity
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Tools</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(stats.totalTools)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Package className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
              </div>
            </Card>

            <Card className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Reviews</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(stats.pendingReviews)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                  <Clock className="text-yellow-600 dark:text-yellow-400" size={24} />
                </div>
              </div>
            </Card>

            <Card className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(stats.totalUsers)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <Users className="text-green-600 dark:text-green-400" size={24} />
                </div>
              </div>
            </Card>

            <Card className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Views</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(stats.totalViews)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <BarChart3 className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
              </div>
            </Card>
          </div>

          {/* Pending Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Tool Submissions</CardTitle>
              <CardDescription>
                Review and approve new tool submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="loading-spinner mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
              ) : pendingTools.length > 0 ? (
                <div className="space-y-4">
                  {pendingTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 dark:border-dark-700 rounded-lg"
                    >
                      <img
                        src={tool.imageUrl}
                        alt={tool.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-2">
                          {tool.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Submitted {timeAgo(tool.createdAt)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<CheckCircle size={16} />}
                          onClick={() => handleApprove(tool.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={<XCircle size={16} />}
                          onClick={() => handleReject(tool.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No pending submissions
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    All tool submissions have been reviewed
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
