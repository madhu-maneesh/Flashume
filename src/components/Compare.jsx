import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadBox from "./UploadBox";
import toast, { Toaster } from "react-hot-toast";


export default function Compare(){
    const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const navigate = useNavigate();

  const handleCompare = async () => {
    if (!file1 || !file2) {
      toast.error("Please upload both resumes");
      return;
    }

    const formData = new FormData();
    formData.append("resume1", file1);
    formData.append("resume2", file2);

    const toastId = toast.loading("Uploading your resumes...");


    try {
      const res = await axios.post("http://localhost:5000/compare", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.dismiss(toastId);

      toast.success("Uploaded successfully!");
     navigate("/compareresults", { state: { result: res.data.result } });
    } catch (err) {
      console.error("Comparison failed", err);
      toast.dismiss(toastId);
      toast.error("Comparison failed");
    }
  };

    return (
    <div className="container py-5">
    <div className="d-flex flex-column align-items-center text-center mb-5">
        <h2 className="mb-3"><i>Select the Resume to Compare</i></h2>
        <UploadBox
        className="p-4 border border-primary rounded"
         onFileSelect={(file1) => setFile1(file1)}

        />
    </div>
      {file1 && (
  <div className="alert alert-success text-center mt-2" role="alert">
    Selected File: <strong>{file1.name}</strong> ({(file1.size / 1024).toFixed(1)} KB)
  </div>
)}


  <div className="d-flex flex-column align-items-center text-center">
    <h2 className="mb-3"><i>Upload the Resume</i></h2>
    <UploadBox
      className="p-4 border border-success rounded"
     onFileSelect={(file2) => setFile2(file2)}
    />
  </div>

    {file2 && (
  <div className="alert alert-success text-center mt-2" role="alert">
    Selected File: <strong>{file2.name}</strong> ({(file2.size / 1024).toFixed(1)} KB)
  </div>
)}

    <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleCompare}>
          Compare
        </button>
      </div>
   <Toaster position="top-center" />


</div>

        

    )
}