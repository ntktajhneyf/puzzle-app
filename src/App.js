import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PuzzleComponent from './components/PuzzleComponent';
import ImageUploadComponent from './components/ImageUploadComponent';
import PuzzleSettingsComponent from './components/PuzzleSettingsComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageUploadComponent />} />
        <Route path="/settings" element={<PuzzleSettingsComponent />} />
        <Route path="/puzzle" element={<PuzzleComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
