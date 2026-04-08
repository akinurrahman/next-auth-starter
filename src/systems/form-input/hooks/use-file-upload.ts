import { useEffect, useRef, useState } from 'react';

import { ControllerRenderProps } from 'react-hook-form';

import { UploadedFileInfo } from '../fields/file-upload/types';
import { generateFileKey, uploadFileToCloud } from '../fields/file-upload/utils';
import { FileUploadCategory } from '../types';

interface UseFileUploadOptions {
  category: FileUploadCategory;
  multiple?: boolean;
  field: ControllerRenderProps;
}

export function useFileUpload({ category, multiple, field }: UseFileUploadOptions) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFileInfo>>({});

  // Handle initial/default values from form
  useEffect(() => {
    const initialValue = field.value;

    // If no value, clear files
    if (!initialValue) {
      setUploadedFiles({});
      return;
    }

    const urls = Array.isArray(initialValue) ? initialValue : [initialValue];

    // Check if current uploaded files match the form value
    const currentUrls = Object.values(uploadedFiles)
      .map(f => f.url)
      .filter(Boolean);
    const urlsMatch =
      currentUrls.length === urls.length && urls.every((url: string) => currentUrls.includes(url));

    // Only update if values don't match (avoid infinite loop)
    if (urlsMatch) return;

    const initialFiles: Record<string, UploadedFileInfo> = {};

    urls.forEach((url: string, index: number) => {
      if (!url) return;

      // Create a mock File object for existing files
      const fileName = url.split('/').pop() || `file-${index}`;
      const fileKey = `existing-${fileName}-${index}`;

      initialFiles[fileKey] = {
        file: new File([], fileName, { type: 'application/octet-stream' }),
        url,
        progress: 100,
        uploading: false,
        error: null,
      };
    });

    setUploadedFiles(initialFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  const handleFileUpload = async (file: File) => {
    const fileKey = generateFileKey(file);

    // Initialize file state
    setUploadedFiles(prev => ({
      ...prev,
      [fileKey]: {
        file,
        url: null,
        progress: 0,
        uploading: true,
        error: null,
      },
    }));

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadedFiles(prev => {
          const current = prev[fileKey];
          if (!current || current.progress >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return {
            ...prev,
            [fileKey]: {
              ...current,
              progress: Math.min(current.progress + Math.random() * 20, 90),
            },
          };
        });
      }, 300);

      // Upload file
      const url = await uploadFileToCloud(file, category);

      clearInterval(progressInterval);

      // Update file state with URL
      setUploadedFiles(prev => ({
        ...prev,
        [fileKey]: {
          ...prev[fileKey],
          url,
          progress: 100,
          uploading: false,
        },
      }));

      // Update form field value
      if (multiple) {
        const currentUrls = Array.isArray(field.value) ? field.value : [];
        field.onChange([...currentUrls, url]);
      } else {
        field.onChange(url);
      }
    } catch (error) {
      setUploadedFiles(prev => ({
        ...prev,
        [fileKey]: {
          ...prev[fileKey],
          uploading: false,
          error: error instanceof Error ? error.message : 'Upload failed',
        },
      }));
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);

    if (!multiple && newFiles.length > 0) {
      // For single file upload, clear existing files
      setUploadedFiles({});
    }

    // Upload files
    newFiles.forEach(file => {
      handleFileUpload(file);
    });
  };

  const removeFile = (fileKey: string) => {
    const fileInfo = uploadedFiles[fileKey];
    if (!fileInfo) return;

    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fileKey];
      return newFiles;
    });

    // Update form field value
    if (multiple && fileInfo.url) {
      const currentUrls = Array.isArray(field.value) ? field.value : [];
      field.onChange(currentUrls.filter((url: string) => url !== fileInfo.url));
    } else {
      field.onChange(null);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    uploadedFiles,
    handleFileSelect,
    removeFile,
    openFilePicker,
  };
}
