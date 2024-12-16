import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/images/1.jpg';
import image2 from '../assets/images/3.jpg';
import image3 from '../assets/images/5.jpg';
import image4 from '../assets/images/6.jpg';
import image5 from '../assets/images/2.webp';
import image6 from '../assets/images/4.webp';


import './ImageUploadComponent.css';

function ImageUploadComponent() {
  const [image, setImage] = useState(null);
  const [pieces, setPieces] = useState(4); // Default to 2x2
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleImageSelect = (image) => {
    setImage(image);
  };

  const handleNext = () => {
    if (image) {
      navigate('/puzzle', { state: { image, pieces } });
    }
  };

  return (
    <div class="upload-image">
      <h2>Upload Image</h2>

      <div class="image-selection">
        <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
</div>
        <div class="block-size">
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

      <button class="button-next" onClick={handleNext} disabled={!image}>Next</button>
      </div>
      <h3>Or select one of the standard images:</h3>
      <div class="standard-images">
        <img src={image1} alt="Standard 1" onClick={() => handleImageSelect(image1)} class="standard-image" />
        <img src={image2} alt="Standard 2" onClick={() => handleImageSelect(image2)} class="standard-image" />
        <img src={image3} alt="Standard 3" onClick={() => handleImageSelect(image3)} class="standard-image" />
        <img src={image4} alt="Standard 3" onClick={() => handleImageSelect(image3)} class="standard-image" />
        <img src={image5} alt="Standard 3" onClick={() => handleImageSelect(image3)} class="standard-image" />
        <img src={image6} alt="Standard 3" onClick={() => handleImageSelect(image3)} class="standard-image" />
      </div>
    </div>
  );
}

export default ImageUploadComponent;
