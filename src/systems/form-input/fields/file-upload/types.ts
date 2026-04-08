/**
 * Information about an uploaded file
 */
export interface UploadedFileInfo {
  file: File;
  url: string | null; // Server path (not full URL)
  progress: number;
  uploading: boolean;
  error: string | null;
}

/**
 * Response from the file upload API
 */
export interface UploadResponse {
  status: string;
  data: {
    url: string; // Path only, not full URL
  };
}
