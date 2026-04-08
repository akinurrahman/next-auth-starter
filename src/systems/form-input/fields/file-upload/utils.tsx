import { File, FileText, ImageIcon, Music, Video } from 'lucide-react';

import { apiCall } from '@/lib/api/api-call';

import { FileUploadCategory } from '../../types';
import { UploadResponse } from './types';

/**
 * Get the appropriate icon for a file based on its MIME type
 */
export const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) {
    return <ImageIcon className="text-muted-foreground h-6 w-6" />;
  }
  if (mimeType.startsWith('video/')) {
    return <Video className="text-muted-foreground h-6 w-6" />;
  }
  if (mimeType.startsWith('audio/')) {
    return <Music className="text-muted-foreground h-6 w-6" />;
  }
  if (mimeType.includes('pdf') || mimeType.includes('word') || mimeType.includes('document')) {
    return <FileText className="text-muted-foreground h-6 w-6" />;
  }
  return <File className="text-muted-foreground h-6 w-6" />;
};

/**
 * Check if a file is an image based on its MIME type
 */
export const isImageFile = (mimeType: string) => mimeType.startsWith('image/');

/**
 * Upload a file to the cloud storage
 * @param file - The file to upload
 * @param category - The category for file organization (student_photo, institution_logo, document)
 * @returns The API path to the uploaded file (without base URL)
 */
export const uploadFileToCloud = async (
  file: File,
  category: FileUploadCategory
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);

  const response = (await apiCall('/files/upload', formData, 'POST')) as UploadResponse;

  if (response.status === 'success' && response.data.url) {
    // Return only the path, not the full URL
    return response.data.url;
  }

  throw new Error('Upload failed');
};

/**
 * Generate a unique key for a file based on its properties
 */
export const generateFileKey = (file: File): string => {
  return `${file.name}-${file.size}-${file.lastModified}`;
};

/**
 * Get the display URL for a file
 * For images that are uploaded, prepend the base URL
 * For previews, use the blob URL
 */
export const getDisplayUrl = (
  previewUrl: string | null,
  serverPath: string | null,
  isImage: boolean
): string | null => {
  if (previewUrl) return previewUrl;
  if (serverPath && isImage) {
    return `${process.env.NEXT_PUBLIC_FILES_URL}${serverPath}`;
  }
  return null;
};

/**
 * Format file size in KB
 */
export const formatFileSize = (bytes: number): string => {
  return `${(bytes / 1024).toFixed(1)} KB`;
};

/**
 * Create an object URL for file preview
 * Remember to revoke it when done to avoid memory leaks
 */
export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Revoke object URL to free up memory
 */
export const revokePreviewUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};
