export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};

export const openUploadWidget = (options, callback) => {
  if (!window.cloudinary) {
    console.error('Cloudinary script not loaded');
    return;
  }

  window.cloudinary.createUploadWidget(
    {
      cloudName: cloudinaryConfig.cloudName,
      uploadPreset: cloudinaryConfig.uploadPreset,
      ...options,
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        callback(result.info.secure_url);
      }
    }
  ).open();
};
