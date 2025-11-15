import { useState } from 'react';
import { Upload } from 'lucide-react';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { validateToolForm } from '@/utils/validators';
import { CATEGORIES, PRICING_TYPES } from '@/utils/constants';
import { openUploadWidget } from '@/services/cloudinary';
import { useAuth } from '@/hooks/use-auth';
import { useTools } from '@/hooks/use-tools';
import { toast } from '@/components/ui/toast';
import { trackToolSubmission } from '@/services/analytics';

const ToolForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const { submitTool } = useTools();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: '',
    pricing: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageUpload = async () => {
    try {
      setUploading(true);
      const result = await openUploadWidget();
      setFormData((prev) => ({ ...prev, imageUrl: result.url }));
      setErrors((prev) => ({ ...prev, imageUrl: null }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validation = validateToolForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Please fix the errors in the form');
      return;
    }

    // Submit tool
    setLoading(true);
    const result = await submitTool(formData, user?.uid);
    setLoading(false);

    if (result.success) {
      trackToolSubmission(formData.name, formData.category);
      // Reset form
      setFormData({
        name: '',
        description: '',
        url: '',
        category: '',
        pricing: '',
        imageUrl: '',
      });
      if (onSuccess) onSuccess();
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tool Name */}
        <Input
          label="Tool Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="e.g., ChatGPT"
        />

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Describe what this AI tool does..."
          />
          {errors.description && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
          )}
        </div>

        {/* URL */}
        <Input
          label="Tool URL *"
          name="url"
          type="url"
          value={formData.url}
          onChange={handleChange}
          error={errors.url}
          placeholder="https://example.com"
        />

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {CATEGORIES.filter((cat) => cat.id !== 'all').map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.category}</p>
          )}
        </div>

        {/* Pricing */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Pricing *
          </label>
          <select
            name="pricing"
            value={formData.pricing}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select pricing type</option>
            {PRICING_TYPES.map((pricing) => (
              <option key={pricing.id} value={pricing.id}>
                {pricing.icon} {pricing.name}
              </option>
            ))}
          </select>
          {errors.pricing && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.pricing}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Tool Image *
          </label>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleImageUpload}
              loading={uploading}
              icon={<Upload size={18} />}
            >
              Upload Image
            </Button>
            {formData.imageUrl && (
              <div className="flex-1">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="h-20 w-auto rounded-lg object-cover border border-gray-200 dark:border-dark-700"
                />
              </div>
            )}
          </div>
          {errors.imageUrl && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.imageUrl}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
          Submit Tool
        </Button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Your submission will be reviewed before appearing on the site.
        </p>
      </form>
    </Card>
  );
};

export default ToolForm;
