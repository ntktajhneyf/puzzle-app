import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PuzzleSettingsComponent() {
  const [pieces, setPieces] = useState(4); // Default to 4 pieces
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state;

  const handleStartPuzzle = () => {
    navigate('/puzzle', { state: { image, pieces } });
  };

  return (
    <div>
      <h2>Set Puzzle Pieces</h2>
      <input
        type="number"
        value={pieces}
        onChange={(e) => setPieces(e.target.value)}
        min="2"
        max="30"
      />
      <button onClick={handleStartPuzzle}>Start Puzzle</button>
    </div>
  );
}

export default PuzzleSettingsComponent;
