import { useState } from 'react';
import './App.css';
import Homepage from "./components/Homepage";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Upload from './components/Upload';
import Results from './components/Results';
import Compare from './components/Compare';
import Compareres from './components/Compareres';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/result" element={<Results />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/compareresults" element={<Compareres />} />
    </Routes>
  );
}

export default App;
