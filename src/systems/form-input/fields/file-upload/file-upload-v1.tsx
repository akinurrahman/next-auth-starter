'use client';

import React from 'react';

import { Loader2, Trash2, Upload } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useFileUpload } from '../../hooks/use-file-upload';
import { FileUploadProps } from '../../types';
import { formatFileSize, getDisplayUrl, getFileIcon, isImageFile } from './utils';

interface FileUpload01Props {
  props: FileUploadProps;
  field: ControllerRenderProps;
}

export default function FileUpload01({ props, field }: FileUpload01Props) {
  const { fileInputRef, uploadedFiles, handleFileSelect, removeFile, openFilePicker } =
    useFileUpload({
      category: props.category,
      multiple: props.multiple,
      field,
    });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const fileEntries = Object.entries(uploadedFiles);

  return (
    <div className="w-full space-y-3">
      <div
        className="border-border hover:bg-muted/30 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-8 text-center transition-colors"
        onClick={openFilePicker}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="bg-muted mb-2 rounded-full p-3">
          <Upload className="text-muted-foreground h-5 w-5" />
        </div>
        <p className="text-foreground text-sm font-medium">Drag and drop files here</p>
        <p className="text-muted-foreground mt-1 text-sm">
          or{' '}
          <label
            htmlFor="fileUpload"
            className="text-primary hover:text-primary/90 cursor-pointer font-medium"
            onClick={e => e.stopPropagation()}
          >
            click to browse
          </label>
        </p>
        <input
          type="file"
          id="fileUpload"
          ref={fileInputRef}
          className="hidden"
          multiple={props.multiple}
          accept={props.accept}
          disabled={props.disabled}
          onChange={e => handleFileSelect(e.target.files)}
        />
      </div>

      <div className={cn('space-y-2', fileEntries.length === 0 && 'hidden')}>
        {fileEntries.map(([fileKey, fileInfo]) => {
          // Check if it's an existing file (has url but file.size is 0)
          const isExistingFile = fileInfo.file.size === 0 && fileInfo.url;
          const isImage = isExistingFile
            ? fileInfo.url?.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
            : isImageFile(fileInfo.file.type);
          const displayUrl = getDisplayUrl(null, fileInfo.url, !!isImage);

          return (
            <div className="border-border flex gap-3 rounded-lg border p-3" key={fileKey}>
              <div className="bg-muted flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm">
                {isImage && displayUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={displayUrl}
                    alt={fileInfo.file.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center">
                    {getFileIcon(fileInfo.file.type)}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">
                      {fileInfo.file.name}
                    </p>
                    {!isExistingFile && (
                      <p className="text-muted-foreground text-xs">
                        {formatFileSize(fileInfo.file.size)}
                      </p>
                    )}
                    {fileInfo.error && (
                      <p className="text-destructive mt-1 text-xs">{fileInfo.error}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 shrink-0"
                    onClick={() => removeFile(fileKey)}
                    disabled={fileInfo.uploading}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {!isExistingFile && (
                  <div className="flex items-center gap-2">
                    <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
                      <div
                        className={cn(
                          'h-full transition-all',
                          fileInfo.error ? 'bg-destructive' : 'bg-primary'
                        )}
                        style={{
                          width: `${fileInfo.progress}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      {fileInfo.uploading && (
                        <Loader2 className="text-muted-foreground h-3 w-3 animate-spin" />
                      )}
                      <span className="text-muted-foreground text-xs whitespace-nowrap">
                        {Math.round(fileInfo.progress)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
