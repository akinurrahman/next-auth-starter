// import { useState } from "react";
// import { useFormContext } from "react-hook-form";
// import { uploadToCloud } from "@/services/file-upload/file-upload";
// import { getCloudinaryThumbnail } from "@/utils/generate-thumbnail";

// interface UseFileUploadProps {
//   name: string;
//   multiple?: boolean;
// }

// export const useFileUpload = ({
//   name,
//   multiple = false,
// }: UseFileUploadProps) => {
//   const { setValue, watch } = useFormContext();
//   const [uploading, setUploading] = useState(false);
//   const uploadedFiles = watch(name) || [];

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const files = event.target.files;
//     if (!files || !files.length) return;

//     setUploading(true);
//     const fileArray = Array.from(files);
//     const cloudinaryUrls = await uploadToCloud(fileArray);

//     if (cloudinaryUrls) {
//       const thumbnails = cloudinaryUrls.map(getCloudinaryThumbnail);
//       const newFiles = cloudinaryUrls.map((url: string, index: number) => ({
//         url,
//         thumbnail: thumbnails[index],
//       }));

//       setValue(name, multiple ? [...uploadedFiles, ...newFiles] : newFiles);
//     }
//     setUploading(false);
//   };

//   const handleRemoveFile = (index: number) => {
//     const updatedFiles = uploadedFiles.filter(
//       (_: any, i: number) => i !== index
//     );
//     setValue(name, updatedFiles);
//   };

//   return {
//     uploadedFiles,
//     uploading,
//     handleFileChange,
//     handleRemoveFile,
//   };
// };
