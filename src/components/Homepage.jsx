import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ChatBox from './Chatbot';


export default function HomePage() {
  const navigate=useNavigate();

  const handleOnclick=()=>{
    navigate('/upload');
  }






  return (
    <div className="min-vh-100 bg-light text-dark">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand fw-bold text-primary">Flashume ⚡</Link>
          <div>
            {/* <Link to='/tailor' className="me-3 text-decoration-none text-secondary">Tailor</Link> */}
            <Link to='/compare' className="me-3 text-decoration-none text-secondary">Compare</Link>
            <Link to='/upload' className="me-3 text-decoration-none text-secondary">Upload</Link>            
            {/* <button className="btn btn-primary">Login</button> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-5 d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="mb-4 mb-md-0">
          <h1 className="display-4 fw-bold">Resume Feedback in a Flash ⚡</h1>
          <p className="lead text-muted mb-4">
            Upload your resume, choose your target ,job role and get an AI-powered ATS scoring, improvement tips, and personalized suggestions instantly.
          </p>
          <button className="btn btn-primary btn-lg" onClick={handleOnclick}> Get Started</button>
        </div>
      </section>


      <div>
          <ChatBox />
      </div>


      {/* Features */}
      <section id="features" className="bg-white py-5">
        <div className="container">
          <h2 className="text-center text-primary fw-bold mb-5">Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 bg-light shadow-sm rounded">
                <h4 className="fw-bold">📄 Resume Upload</h4>
                <p className="text-muted">Drag and drop your resume and let our system read it in seconds.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-light shadow-sm rounded">
                <h4 className="fw-bold">🧠 AI-Powered ATS Scoring</h4>
                <p className="text-muted">Instantly see how well your resume matches the job description using Gemini AI.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-light shadow-sm rounded">
                <h4 className="fw-bold">💬 ResumeBot Assistant</h4>
                <p className="text-muted">Chat with our integrated bot to improve sections, get tips, and ask role-specific advice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-muted py-4">
        Flashume © 2025 MM
      </footer>
    </div>
  );
}
