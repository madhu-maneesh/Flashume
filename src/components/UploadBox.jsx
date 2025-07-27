import { useDropzone } from "react-dropzone";

export default function UploadBox({ onFileSelect }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if(acceptedFiles.length>0){
      onFileSelect(acceptedFiles[0]);

      }
    },
  });

  return (
    <div {...getRootProps()} className="p-4 border border-dashed text-center">
      <input {...getInputProps()} />
      <p>Drag & drop your resume here, or click to select</p>
    </div>
  );
}
