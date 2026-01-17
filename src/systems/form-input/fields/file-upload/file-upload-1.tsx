// import React from "react";
// import { Button } from "@/ui/button";
// import { ImageIcon, Upload, X } from "lucide-react";
// import { FileUploadProps } from "../../types";
// import { getAcceptedFormats } from "@/utils/get-file-type";
// import { useFileUpload } from "../../hooks/use-file-upload";
// import Image from "next/image";

// interface FileUploadProp {
//   props: FileUploadProps;
// }

// const FileUpload1 = ({ props }: FileUploadProp) => {
//   const { uploadedFiles, uploading, handleFileChange, handleRemoveFile } =
//     useFileUpload({
//       name: props.name,
//       multiple: props.multiple,
//     });
//   const acceptedFormats = getAcceptedFormats(props.accept || "*");
//   return (
//     <div className="grid gap-6">
//       <div className="grid gap-3">
//         <div className="border-primary bg-primary/5 relative cursor-pointer rounded-lg border-2 border-dashed p-6 transition-colors">
//           <div className="flex flex-col items-center justify-center gap-3 text-center">
//             <div className="bg-muted rounded-full p-3">
//               <Upload className="text-muted-foreground h-6 w-6" />
//             </div>
//             <div>
//               <p className="font-medium">Drag & drop your images here</p>
//               <p className="text-muted-foreground mt-1 text-sm">
//                 or click to browse ({acceptedFormats}, max 5MB each)
//               </p>
//             </div>
//             <Button
//               variant="secondary"
//               size="sm"
//               className="mt-2"
//               disabled={uploading}
//             >
//               {uploading ? "Uploading..." : "Browse Files"}
//             </Button>
//             <input
//               type="file"
//               multiple={props.multiple || false}
//               onChange={handleFileChange}
//               accept={props.accept || "*"}
//               className="absolute inset-0 cursor-pointer opacity-0"
//               id="upload"
//             />
//           </div>
//         </div>
//         {props.FileDescription && (
//           <p className="text-muted-foreground text-sm">
//             {props.FileDescription}
//           </p>
//         )}
//       </div>

//       {/* Image Preview Grid */}
//       <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
//         {uploadedFiles.map((file: any, index: number) => (
//           <div key={index} className="group relative">
//             {/* Show Thumbnail or Placeholder */}
//             <div className="bg-muted flex aspect-square items-center justify-center overflow-hidden rounded-md border">
//               {file.thumbnail ? (
//                 <Image
//                   src={file.thumbnail}
//                   alt="Thumbnail"
//                   className="h-full w-full rounded-md object-cover"
//                   fill
//                 />
//               ) : (
//                 <ImageIcon className="text-muted-foreground h-8 w-8" />
//               )}
//             </div>

//             {/* Remove Button */}
//             <button
//               type="button"
//               onClick={() => handleRemoveFile(index)}
//               className="bg-background absolute top-2 right-2 rounded-full p-1 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
//             >
//               <X className="h-4 w-4" />
//             </button>

//             {/* Show "Main" tag on the first file */}
//             {index === 0 && (
//               <div className="bg-primary text-primary-foreground absolute bottom-2 left-2 rounded-md px-2 py-1 text-xs">
//                 Main
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FileUpload1;
