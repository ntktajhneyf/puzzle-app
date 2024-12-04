import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PuzzleComponent.css';

function PuzzleComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, pieces } = location.state;
  const [puzzlePieces, setPuzzlePieces] = useState([]);
  const [originalPositions, setOriginalPositions] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const pieceSize = Math.sqrt(pieces);
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    const createPuzzlePieces = () => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const minDimension = Math.min(img.width, img.height);
        const pieceWidth = minDimension / pieceSize;
        const pieceHeight = minDimension / pieceSize;
        const tempPieces = [];
        const tempOriginalPositions = [];

        for (let row = 0; row < pieceSize; row++) {
          for (let col = 0; col < pieceSize; col++) {
            const canvas = document.createElement('canvas');
            canvas.width = pieceWidth;
            canvas.height = pieceHeight;
            const context = canvas.getContext('2d');
            context.drawImage(
              img,
              col * pieceWidth,
              row * pieceHeight,
              pieceWidth,
              pieceHeight,
              0,
              0,
              pieceWidth,
              pieceHeight
            );

            const piece = {
              src: canvas.toDataURL(),
              position: { row, col },
              currentPos: { row, col },
            };

            tempPieces.push(piece);
            tempOriginalPositions.push({ row, col });
          }
        }

        // Запам'ятовування початкового розташування
        setOriginalPositions(tempOriginalPositions);

        // Перемішування пазлів для відображення юзеру
        setPuzzlePieces(tempPieces.sort(() => Math.random() - 0.5));
      };
    };

    createPuzzlePieces();
  }, [image, pieces, pieceSize]);

  const handlePieceClick = (index) => {
    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      const newPuzzlePieces = [...puzzlePieces];
      const temp = newPuzzlePieces[selectedPiece];
      newPuzzlePieces[selectedPiece] = newPuzzlePieces[index];
      newPuzzlePieces[index] = temp;

      // Оновлення поточних позицій після обміну
      const tempPosition = newPuzzlePieces[selectedPiece].currentPos;
      newPuzzlePieces[selectedPiece].currentPos = newPuzzlePieces[index].currentPos;
      newPuzzlePieces[index].currentPos = tempPosition;

      setPuzzlePieces(newPuzzlePieces);
      setSelectedPiece(null);

      if (checkCompletion(newPuzzlePieces)) {
        console.log("Finish");
        setShowDone(true);
      } else {
        setShowDone(false);
      }
    }
  };

  const checkCompletion = (pieces) => {
    return pieces.every((piece, index) => 
      piece.position.row === originalPositions[index].row && piece.position.col === originalPositions[index].col
    );
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleDone = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Puzzle Game <button onClick={handleHome} className="home-button">Home</button></h2>
      <div className="puzzle-container" style={{ gridTemplateColumns: `repeat(${pieceSize}, 1fr)` }}>
        {puzzlePieces.map((piece, index) => (
          <div
            key={index}
            className={`puzzle-piece ${selectedPiece === index ? 'selected' : ''}`}
            style={{
              backgroundImage: `url(${piece.src})`,
              backgroundSize: 'cover',
              transform: selectedPiece === index ? 'scale(1.05)' : 'scale(1)', // Збільшує обрану частину на 5%
              zIndex: selectedPiece === index ? 1 : 0,
            }}
            onClick={() => handlePieceClick(index)}
          />
        ))}
      </div>
      <h3>Preview</h3>
      <div className="preview-container">
        <img src={image} alt="Preview" className="preview-image" style={{ width: `${pieceSize * 100}px`, height: `${pieceSize * 100}px`, objectFit: 'cover' }} />
      </div>
      {showDone && <button onClick={handleDone} className="done-button">Done</button>}
    </div>
  );
}

export default PuzzleComponent;
