import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { useNotification } from '../contexts/notification-context';
import ToolForm from '../components/react/tool-form';
import Card from '../components/ui/card';
import { useTools } from '../hooks/use-tools';

const Create = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const { submitTool } = useTools();
  const navigate = useNavigate();

  const handleSubmit = async (toolData) => {
    try {
      await submitTool(toolData);
      addNotification('Tool submitted successfully!', 'success');
      navigate('/');
    } catch (error) {
      addNotification(error.message, 'error');
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card padding="lg" className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Please login to submit tools
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You need to be logged in to submit new tools to the platform.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Submit a New Tool
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your favorite free tools with the community
        </p>
      </div>

      <Card padding="lg">
        <ToolForm onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};

export default Create;
