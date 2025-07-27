import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadBox from "./UploadBox";
import toast, { Toaster } from 'react-hot-toast';


export default function Upload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    const toastId = toast.loading("Uploading your resume...");


    try {
      const response=await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      toast.dismiss(toastId);

      toast.success("Uploaded successfully!");
  
        navigate("/result");
    } catch (err) {
      console.error("Upload error:", err);
      toast.dismiss(toastId);
      toast.error("upload failed");
    }
  };

  return (
  <div className="container d-flex justify-content-center align-items-center min-vh-100">
  <div className="w-100" style={{ maxWidth: "500px" }}>
    <h2 className="text-center mb-4">Upload Your Resume</h2>

   
    <UploadBox
      className="mb-4"
      style={{
        border: "2px dashed #007bff",
        borderRadius: "10px",
        padding: "60px 20px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "1.1rem",
        color: "#555",
      }}
       onFileSelect={(selectedFile) => setFile(selectedFile)}
    />


    {file && (
  <div className="alert alert-success text-center mt-2" role="alert">
    Selected File: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
  </div>
)}

    <div className="d-grid">
      <button className="btn btn-primary" onClick={handleUpload}>
        Submit
      </button>
    </div>
      
  <Toaster position="top-center" />
  </div>
</div>

  );

}
