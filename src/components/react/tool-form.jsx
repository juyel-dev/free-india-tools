import React, { useState } from 'react';
import Input from '../ui/input';
import Button from '../ui/button';
import { useAuth } from '../../contexts/auth-context';
import { useNotification } from '../../contexts/notification-context';
import { useCloudinary } from '../../hooks/use-cloudinary';

const ToolForm = ({ onSubmit }) => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const { uploadImage } = useCloudinary();
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    category: '',
    description: '',
    noLogin: false,
    madeInIndia: false,
    freeForever: true,
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'ai', label: 'AI Tools' },
    { value: 'design', label: 'Design' },
    { value: 'education', label: 'JEE/NEET' },
    { value: 'freelancing', label: 'Freelancing' },
    { value: 'development', label: 'Development' },
    { value: 'productivity', label: 'Productivity' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const toolData = {
        ...formData,
        imageUrl,
        submittedBy: user.uid,
        submittedByName: user.displayName || user.email,
        submittedByEmail: user.email,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      await onSubmit(toolData);
      addNotification('Tool submitted successfully!', 'success');

      // Reset form
      setFormData({
        name: '',
        link: '',
        category: '',
        description: '',
        noLogin: false,
        madeInIndia: false,
        freeForever: true,
      });
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      addNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          label="Tool Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div>
        <Input
          label="Tool URL"
          name="link"
          type="url"
          value={formData.link}
          onChange={handleChange}
          required
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-saffron focus:border-saffron"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          minLength={20}
          maxLength={500}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-saffron focus:border-saffron"
          placeholder="Why is this tool useful? (Min 20 characters)"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {formData.description.length}/500 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Screenshot (Optional but recommended)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto h-40 object-contain"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-saffron hover:text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-saffron"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 5MB
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="noLogin"
            checked={formData.noLogin}
            onChange={handleChange}
            className="rounded text-saffron focus:ring-saffron"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            No Login Required
          </span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="madeInIndia"
            checked={formData.madeInIndia}
            onChange={handleChange}
            className="rounded text-saffron focus:ring-saffron"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Made in India
          </span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="freeForever"
            checked={formData.freeForever}
            onChange={handleChange}
            className="rounded text-saffron focus:ring-saffron"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Free Forever
          </span>
        </label>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={loading}
        >
          Submit Tool for Review
        </Button>
      </div>
    </form>
  );
};

export default ToolForm;
