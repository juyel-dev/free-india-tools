import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-800 mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            size="lg"
            icon={<Home size={20} />}
            onClick={() => navigate('/')}
          >
            Go to Homepage
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon={<ArrowLeft size={20} />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-8">
          Need help? Contact us at{' '}
          <a
            href="mailto:support@graphz.ai"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            support@graphz.ai
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
