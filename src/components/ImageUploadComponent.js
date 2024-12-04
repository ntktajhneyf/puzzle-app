import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ImageUploadComponent() {
  const [image, setImage] = useState(null);
  const [pieces, setPieces] = useState(4); // Default to 2x2
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleNext = () => {
    if (image) {
      navigate('/puzzle', { state: { image, pieces } });
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div>
        <label>
          <input
            type="radio"
            value={4}
            checked={pieces === 4}
            onChange={() => setPieces(4)}
          />
          2x2
        </label>
        <label>
          <input
            type="radio"
            value={9}
            checked={pieces === 9}
            onChange={() => setPieces(9)}
          />
          3x3
        </label>
        <label>
          <input
            type="radio"
            value={16}
            checked={pieces === 16}
            onChange={() => setPieces(16)}
          />
          4x4
        </label>
      </div>
      <button onClick={handleNext} disabled={!image}>Next</button>
    </div>
  );
}

export default ImageUploadComponent;
