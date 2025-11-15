import { useNavigate } from 'react-router-dom';
import { PlusCircle, Info } from 'lucide-react';
import ToolForm from '@/components/react/tool-form';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import Button from '@/components/ui/button';

const CreatePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen pb-20 md:pb-8 flex items-center justify-center">
        <Card className="max-w-md mx-4 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusCircle className="text-primary-600 dark:text-primary-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Submit Your AI Tool
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please log in to submit a new AI tool to our directory.
            </p>
          </div>
          <Button variant="primary" size="lg" className="w-full" onClick={() => navigate('/login')}>
            Login to Continue
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <PlusCircle className="text-primary-600 dark:text-primary-400" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Submit a New AI Tool
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share an AI tool with our community. All submissions are reviewed before going live.
          </p>
        </div>

        {/* Guidelines */}
        <Card className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                Submission Guidelines
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                <li>• Make sure the tool is AI-powered or AI-related</li>
                <li>• Provide accurate and detailed information</li>
                <li>• Use a high-quality screenshot or logo (16:9 ratio recommended)</li>
                <li>• Your submission will be reviewed within 24-48 hours</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Form */}
        <ToolForm onSuccess={() => navigate('/')} />
      </div>
    </div>
  );
};

export default CreatePage;
