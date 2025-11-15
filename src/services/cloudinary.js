const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'graphz-tools');

    const xhr = new XMLHttpRequest();

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          onProgress(percentComplete);
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve({
          url: response.secure_url,
          publicId: response.public_id,
          width: response.width,
          height: response.height,
          format: response.format,
        });
      } else {
        reject(new Error('Upload failed'));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
    xhr.send(formData);
  });
};

// Open Cloudinary Upload Widget
export const openUploadWidget = (options = {}) => {
  return new Promise((resolve, reject) => {
    if (!window.cloudinary) {
      const script = document.createElement('script');
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
      script.onload = () => initWidget();
      document.body.appendChild(script);
    } else {
      initWidget();
    }

    function initWidget() {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          uploadPreset: CLOUDINARY_UPLOAD_PRESET,
          folder: 'graphz-tools',
          sources: ['local', 'url', 'camera'],
          multiple: false,
          maxFileSize: 5000000, // 5MB
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
          maxImageWidth: 2000,
          maxImageHeight: 2000,
          cropping: true,
          croppingAspectRatio: 16 / 9,
          croppingShowDimensions: true,
          croppingCoordinatesMode: 'custom',
          ...options,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (result.event === 'success') {
            resolve({
              url: result.info.secure_url,
              publicId: result.info.public_id,
              width: result.info.width,
              height: result.info.height,
              format: result.info.format,
            });
            widget.close();
          }
        }
      );

      widget.open();
    }
  });
};

// Get optimized image URL
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 800,
    height = 450,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options;

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_${crop},f_${format},q_${quality},w_${width},h_${height}/${publicId}`;
};

// Delete image from Cloudinary (requires backend/admin SDK)
export const deleteFromCloudinary = async (publicId) => {
  // This would typically be done on the backend
  // Frontend can't delete images directly for security reasons
  console.warn('Delete from Cloudinary should be handled by backend');
  return false;
};

export default {
  uploadToCloudinary,
  openUploadWidget,
  getOptimizedImageUrl,
  deleteFromCloudinary,
};
