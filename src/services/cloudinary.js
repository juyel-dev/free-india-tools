// Cloudinary Image Upload Service

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export const uploadImage = async (file) => {
  if (!file) {
    throw new Error('No file provided')
  }

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    console.warn('Cloudinary not configured, using placeholder')
    return 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'
  }

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    formData.append('folder', 'free-india-tools')

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload image')
  }
}

export const uploadImageWithProgress = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'))
      return
    }

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      console.warn('Cloudinary not configured, using placeholder')
      resolve('https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    formData.append('folder', 'free-india-tools')

    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100
        if (onProgress) {
          onProgress(percentComplete)
        }
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)
        resolve(data.secure_url)
      } else {
        reject(new Error('Upload failed'))
      }
    })

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'))
    })

    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`)
    xhr.send(formData)
  })
}

export const getOptimizedImageUrl = (url, width = 400, quality = 'auto') => {
  if (!url || !url.includes('cloudinary')) {
    return url
  }

  // Insert transformation parameters into Cloudinary URL
  const parts = url.split('/upload/')
  if (parts.length === 2) {
    return `${parts[0]}/upload/w_${width},q_${quality},f_auto/${parts[1]}`
  }

  return url
}

export default {
  uploadImage,
  uploadImageWithProgress,
  getOptimizedImageUrl,
}
