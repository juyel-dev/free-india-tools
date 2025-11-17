/* Updated AdminDashboard code with Tool replaced by Settings */

import React, { useState, useEffect } from 'react'; import { LayoutDashboard, Settings, Users, Settings as SettingsIcon, Image as ImageIcon, BarChart2, Check, X, Eye, Trash2, FileText, Download, } from 'lucide-react'; import Card from '../ui/card'; import Button from '../ui/button'; import Skeleton from '../ui/skeleton'; import { useTools } from '../../hooks/use-tools'; import { useAuth } from '../../contexts/auth-context';

const AdminDashboard = () => { const { user } = useAuth(); const { tools, pendingTools, users, approveTool, rejectTool } = useTools(); const [activeTab, setActiveTab] = useState('dashboard'); const [loading, setLoading] = useState(true);

useEffect(() => { const timer = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(timer); }, []);

const quickStats = [ { label: 'Total Tools', value: tools.length, icon: Settings }, { label: 'Pending Tools', value: pendingTools.length, icon: FileText }, { label: 'Total Users', value: users.length, icon: Users }, { label: 'Featured Tools', value: tools.filter((t) => t.featured).length, icon: Star }, ];

const quickActions = [ { label: 'Approve All Pending', icon: Check, action: () => {} }, { label: 'Add New Banner', icon: ImageIcon, action: () => {} }, { label: 'Site ON/OFF Toggle', icon: SettingsIcon, action: () => {} }, { label: 'Export Data CSV', icon: Download, action: () => {} }, ];

const recentActivity = [ { type: 'submission', user: 'rajesh', tool: 'Figma Alternative', time: '2 min ago' }, { type: 'click', tool: 'Photopea', clicks: '1000', time: '1 hour ago' }, { type: 'signup', user: 'priya@example.com', time: '3 hours ago' }, { type: 'feature', tool: 'Canva', user: 'admin', time: '1 day ago' }, ];

return ( <div className="p-4 sm:p-6"> <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"> Admin Dashboard </h1>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {quickStats.map((stat, index) => (
      <Card key={index} padding="md">
        {loading ? (
          <Skeleton type="text" className="h-12" />
        ) : (
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-saffron/10 text-saffron mr-4">
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </p>
            </div>
          </div>
        )}
      </Card>
    ))}
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {quickActions.map((action, index) => (
      <Button
        key={index}
        variant="outline"
        className="flex items-center justify-center h-12"
        onClick={action.action}
      >
        <action.icon className="h-4 w-4 mr-2" />
        {action.label}
      </Button>
    ))}
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2">
      <Card padding="md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Pending Submissions ({pendingTools.length})
          </h2>
          <Button variant="outline" size="sm">
            Approve All
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton type="card" />
            <Skeleton type="card" />
          </div>
        ) : pendingTools.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No pending submissions
          </p>
        ) : (
          <div className="space-y-4">
            {pendingTools.slice(0, 3).map((tool) => (
              <div
                key={tool.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {tool.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Submitted by {tool.submittedByName} •{' '}
                      {new Date(tool.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => approveTool(tool.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => rejectTool(tool.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>

    <div>
      <Card padding="md">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Recent Activity
        </h2>

        {loading ? (
          <div className="space-y-2">
            <Skeleton type="text" className="h-8" />
            <Skeleton type="text" className="h-8" />
            <Skeleton type="text" className="h-8" />
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-3">
                  {activity.type === 'submission' && (
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
                      <FileText className="h-5 w-5" />
                    </div>
                  )}
                  {activity.type === 'click' && (
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200">
                      <Eye className="h-5 w-5" />
                    </div>
                  )}
                  {activity.type === 'signup' && (
                    <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-200">
                      <Users className="h-5 w-5" />
                    </div>
                  )}
                  {activity.type === 'feature' && (
                    <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-200">
                      <Star className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.type === 'submission' && (
                      <>
                        <span className="font-semibold">
                          {activity.user}
                        </span>{' '}
                        submitted{' '}
                        <span className="font-semibold">
                          {activity.tool}
                        </span>
                      </>
                    )}
                    {activity.type === 'click' && (
                      <>
                        <span className="font-semibold">
                          {activity.tool}
                        </span>{' '}
                        reached {activity.clicks} clicks
                      </>
                    )}
                    {activity.type === 'signup' && (
                      <>
                        New user{' '}
                        <span className="font-semibold">
                          {activity.user}
                        </span>{' '}
                        signed up
                      </>
                    )}
                    {activity.type === 'feature' && (
                      <>
                        <span className="font-semibold">
                          {activity.tool}
                        </span>{' '}
                        was featured by{' '}
                        <span className="font-semibold">
                          {activity.user}
                        </span>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  </div>
</div>

); };

export default AdminDashboard;

